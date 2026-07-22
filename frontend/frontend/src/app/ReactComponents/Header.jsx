"use client"

import { useRouter } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '../../components/ui/dropdown-menu'
import { Button } from "../../components/ui/button"
import { MoreVertical, Settings, LogOut } from "lucide-react"
import { supabase } from '../../../lib/supabase'
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header() {
    const router = useRouter()
    const [tasks, setTasks] = useState([])

    async function fetchTasks() {
        try {

            const { data: { user } } = await supabase.auth.getUser()
            const { data, error } = await supabase
                .from('todo_items')
                .select('*')
                .eq('user_id', user.id)

            setTasks(data)
        }
        catch {
            alert('Error fetching tasks for header data')
        }
    }

    async function handleLogOut() {
        await supabase.auth.signOut()
        redirect('/login')
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <header className="select-none bg-[#22223b] border-b-2 border-[#4a4e69] px-6 py-3 flex items-center justify-between shadow-md">

            {/* Left Side: Context / Navigation */}
            <div className="flex-1">
                {tasks &&
                    <div className="text-xl text-[#C9ADA7] font-bold uppercase tracking-wider flex gap-2">
                        <p>{tasks.filter(t => t.is_done === true).length + '/' + tasks.length || 0} tasks completed</p>
                        <p className="">({Math.round(tasks.filter(t => t.is_done === true).length / tasks.length * 100) || 0}%)</p>

                    </div>

                }
            </div>

            {/* Center: Interactive Logo */}
            <div
                onClick={() => { redirect('/') }}
                className="flex-shrink-0 cursor-pointer group flex items-center gap-2"
            >
                <h1 className="text-3xl font-black tracking-wide text-[#f2e9e4] group-hover:text-[#c9ada7] transition-colors">
                    All Done
                </h1>
                <span className="text-2xl group-hover:scale-110 transition-transform">✔️</span>
            </div>

            {/* Right Side: Dropdown Menu */}
            <div className="flex-1 flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-xl text-[#f2e9e4] hover:bg-[#4a4e69]/40 focus:ring-0 transition-colors border-2 border-transparent hover:border-[#4a4e69]"
                        >
                            <MoreVertical className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>

                    {/* Styled the popup to match the app theme instead of Radix's default zinc */}
                    <DropdownMenuContent align="end" className="bg-[#22223b] border-2 border-[#4a4e69] text-[#f2e9e4] rounded-xl shadow-xl min-w-[150px] p-1">

                        <DropdownMenuItem className="cursor-pointer hover:bg-[#4a4e69]/50 focus:bg-[#4a4e69]/50 focus:text-[#c9ada7] rounded-lg transition-colors py-2.5">
                            <Settings className="mr-2 h-4 w-4" />
                            <span className="font-medium text-sm">Settings</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-red-500/15 focus:bg-red-500/15 focus:text-red-300 rounded-lg transition-colors py-2.5 mt-1">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span onClick={handleLogOut} className="font-medium text-sm">Log Out</span>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </header>
    )
}