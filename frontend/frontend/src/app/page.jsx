"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import ListAddForm from './ReactComponents/ListAddForm'
import List from "./ReactComponents/List";
import SearchBar from "./ReactComponents/SearchBar";
import Task from "./ReactComponents/Task";
import refreshIcon from '../../public/refresh.png'
import { RefreshCw } from 'lucide-react'

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase"


export default function Home() {
  const [showsTasks, setShowTasks] = useState(false)
  const [lists, setLists] = useState([])
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchLists = async () => {
    setIsLoading(true)
    setLists([])
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      try {
        const { data, error } = await supabase
          .from('todo_lists')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (!error) { setLists(data) }
        else throw new Error("Error fetching lists")
      } catch (error) {
        console.log(error)
      }

    }
    setIsLoading(false)
  }

  //different fetch choice: backend instead of useEffect
  const fetchTasks = async () => {
    setIsLoading(true)
    setTasks([])
    try {
      const { data: { user } } = await supabase.auth.getUser()
      //url here
      const response = await fetch(`http://localhost:5000/tasks/${user.id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setTasks(data)

    } catch (error) {
      console.error("Failed to fetch tasks from backend:", error)
    }
    finally {
      setIsLoading(false)
    }
  }

  //toggle the task's status by clicking the star
  const toggleStatus = async (taskId, currentStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, is_done: !currentStatus, isDone: !currentStatus } : task
    ))

    const { error } = await supabase
      .from('todo_items')
      .update({ is_done: !currentStatus })
      .eq("id", taskId)

    if (error) {
      alert(error.message)
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, is_done: currentStatus, isDone: currentStatus } : task
      ))
    }

  }

  useEffect(() => {
    fetchTasks()
  }, [showsTasks])

  useEffect(() => {
    fetchLists()
  }, [showsTasks])

  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredLists = lists.filter(list => list.title.toLowerCase().includes(searchQuery.toLowerCase()))


  return (
    <div className="w-screen p-2">
      <div className="flex items-center justify-left gap-4">

        {/* tasks vs lists switcher */}
        <div className="flex gap-5 items-center rounded-xl border-3 w-fit p-2 border-[#22223B] border-4 mt-2">
          <Label htmlFor="showTasksOnly" className="text-[#4A4E69] cursor-pointer flex-1 w-fit max-w-[120px]">
            {showsTasks ? 'Shows Tasks' : 'Shows Lists'}
          </Label>
          <Switch
            id='showTasksOnly'
            checked={showsTasks}
            onCheckedChange={setShowTasks}
            className="data-[state=checked]:bg-amber-500" // Optional: custom color when turned on
          />
        </div>

        <button
          onClick={() => {
            if (showsTasks) fetchTasks()
            else fetchLists()
          }}
          className="group flex items-center gap-2 bg-[#c9ada7] hover:bg-[#b09690] text-[#22223b] px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-md"
        >
          {/* The group-hover makes the icon spin when the button is hovered! */}
          <RefreshCw className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
          <span>Update</span>
        </button>
      </div>

      {/* main space */}
      <div className="mt-2">
        <div className="border-b-4 rounded-xs w-[99%] border-b-[#22223b] pb-4">
          <ListAddForm onListAdded={fetchLists} />
        </div>

        <SearchBar showsTasks={showsTasks} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {showsTasks ? (
        /* tasks */
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {tasks.length === 0 ? (
            <p className="text-[#4A4E69] col-span-full">Loading your tasks...</p>
          ) : (
            filteredTasks.map((task) => (
              <Task
                onStatusToggle={toggleStatus}
                id={task.id}
                key={task.id}
                title={task.title}
                isDone={task.is_done || task.isDone} // Handles both DB naming conventions
                priority={task.priority}
                createdAt={task.created_at || task.createdAt}
              />
            ))
          )}
        </div>
      ) : (
        /* lists */
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {lists.length === 0 ? (
            <p className="text-[#4A4E69] col-span-full">Loading your lists...</p>
          ) : (
            filteredLists.map((list, index) => (
              <List
                key={list.id}
                index={index}
                id={list.id}
                title={list.title}
                donePercentage={list.done_percentage}
                createdAt={list.created_at}
                isDone={list.is_done}
              />
            ))
          )}
        </div>
      )}

    </div>
  );
}
