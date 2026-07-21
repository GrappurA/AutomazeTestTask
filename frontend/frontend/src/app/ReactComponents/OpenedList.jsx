"use client"

import { useEffect, useState } from 'react'
import { ArrowLeft, Plus, Trash2, Calendar, AlertCircle } from 'lucide-react'
import { supabase } from '../../../lib/supabase'

export default function OpenedListView({ list, onBack, onProgressChange }) {
    const [tasks, setTasks] = useState([])
    const [newTaskText, setNewTaskText] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true)
            const { data, error } = await supabase
                .from('todo_items')
                .select('*')
                .eq('list_id', list.id)
                .order('created_at', { ascending: true })

            if (!error && data) {
                setTasks(data)
            }
            setIsLoading(false)
        }

        if (list?.id) fetchTasks()
    }, [list?.id])

    const handleAddTask = async (e) => {
        e.preventDefault()
        if (!newTaskText.trim()) return

        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('todo_items')
            .insert([{
                title: newTaskText,
                list_id: list.id,
                user_id: user.id
            }])
            .select()

        if (!error && data) {
            setTasks([...tasks, data[0]])
            setNewTaskText("")
        } else {
            console.error("Error adding task:", error?.message)
        }
    }

    const toggleTask = async (taskId, currentStatus) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, is_done: !currentStatus } : t))

        const { error } = await supabase
            .from('todo_items')
            .update({ is_done: !currentStatus })
            .eq('id', taskId)

        if (error) console.error("Error updating task:", error.message)
    }

    const deleteTask = async (taskId) => {
        setTasks(tasks.filter(t => t.id !== taskId))

        await supabase
            .from('todo_items')
            .delete()
            .eq('id', taskId)
    }

    const doneCount = tasks.filter(t => t.is_done).length
    const progressPercent = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100)

    useEffect(() => {
        // Don't sync while initially loading data to prevent overwriting the DB with 0%
        if (isLoading) return;

        if (onProgressChange) onProgressChange(progressPercent);

        const updateListDatabase = async () => {
            await supabase
                .from('todo_lists')
                .update({
                    done_percentage: progressPercent,
                    is_done: progressPercent === 100
                })
                .eq('id', list.id)
        }

        updateListDatabase();

    }, [progressPercent, isLoading, list.id])

    return (
        <div className="w-full max-w-4xl h-full sm:h-[90vh] bg-[#22223b] sm:rounded-3xl border-2 border-[#4a4e69] p-4 sm:p-8 shadow-2xl flex flex-col animate-scale-up">

            {/* Header Section */}
            <div className="flex items-start gap-4 border-b-2 border-[#4a4e69] pb-4 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 mt-1 text-[#9a8c98] hover:text-[#f2e9e4] hover:bg-[#4a4e69]/50 rounded-xl transition-all active:scale-90"
                >
                    <ArrowLeft className="w-7 h-7" />
                </button>
                <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl font-black text-[#f2e9e4] tracking-wide truncate">
                        {list?.title || list?.name}
                    </h1>

                    {list?.description && (
                        <p className="text-[#9a8c98] text-sm mt-1 font-medium">
                            {list.description}
                        </p>
                    )}

                    {/* Live Progress Bar */}
                    <div className="flex items-center gap-3 mt-4">
                        <div className="flex-1 h-2.5 bg-[#4a4e69]/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#c9ada7] transition-all duration-700 ease-out rounded-full"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <span className="text-sm font-bold text-[#9a8c98] w-10 text-right">
                            {progressPercent}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 bg-[#4a4e69]/20 border-2 border-[#4a4e69] rounded-xl px-5 py-4 text-[#f2e9e4] placeholder:text-[#9a8c98] focus:outline-none focus:border-[#c9ada7] focus:bg-[#4a4e69]/40 transition-all text-lg shadow-inner"
                />
                <button
                    type="submit"
                    disabled={!newTaskText.trim()}
                    className="bg-[#c9ada7] hover:bg-[#b09690] disabled:opacity-50 disabled:hover:bg-[#c9ada7] text-[#22223b] px-6 rounded-xl transition-all active:scale-95 flex items-center justify-center shadow-md"
                >
                    <Plus className="w-8 h-8" />
                </button>
            </form>

            {/* Tasks List */}
            <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                {isLoading ? (
                    <div className="flex justify-center mt-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c9ada7]"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <p className="text-[#9a8c98] text-center mt-10 text-lg">You haven't added any tasks yet.</p>
                ) : (
                    tasks.map((task, index) => (
                        <div
                            key={task.id}
                            className="animate-slide-in-task group flex items-start gap-4 bg-[#4a4e69]/20 hover:bg-[#4a4e69]/40 border-2 border-transparent hover:border-[#4a4e69] rounded-xl p-4 transition-all shadow-sm"
                            style={{ animationDelay: `${index * 40}ms` }}
                        >
                            <div className="relative flex items-center justify-center w-7 h-7 shrink-0 mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={task.is_done}
                                    onChange={() => toggleTask(task.id, task.is_done)}
                                    className="peer appearance-none w-7 h-7 border-2 border-[#9a8c98] checked:border-[#c9ada7] checked:bg-[#c9ada7] rounded-lg cursor-pointer transition-all active:scale-90"
                                />
                                <svg className="absolute w-5 h-5 text-[#22223b] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <div className="flex flex-col flex-1 gap-1.5">
                                <span className={`text-lg transition-all duration-300 ${task.is_done ? 'text-[#9a8c98] line-through opacity-70' : 'text-[#f2e9e4]'}`}>
                                    {task.title}
                                </span>

                                {/* DB Metadata Row (Priority & Due Date) */}
                                {(task.priority || task.due_date) && (
                                    <div className="flex items-center gap-3 mt-1">
                                        {task.priority && (
                                            <span className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md 
                                                ${task.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                    task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                        'bg-[#9a8c98]/10 text-[#9a8c98] border border-[#9a8c98]/20'}`}
                                            >
                                                <AlertCircle className="w-3 h-3" />
                                                {task.priority}
                                            </span>
                                        )}

                                        {task.due_date && (
                                            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#9a8c98]">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(task.due_date).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => deleteTask(task.id)}
                                className="p-2.5 text-[#4a4e69] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all active:scale-90 rounded-lg hover:bg-red-500/10 shrink-0"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}