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

export default function Header() {
    const router = useRouter()
    return (
        <header className="select-none bg-[#553A34] h-full border-b-[#22223B] border-b-3 p-2 flex items-center justify-between">
            <p>tasks</p>
            <p onClick={() => { router.push('/') }} className=" text-5xl align-middle w-fit h-fit underline text-white">All done✔️</p>

            {/*the dropdown menu */}
            <DropdownMenu>
                {/* asChild tells the Trigger to use our custom Button instead of making its own */}
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="border-[1.3] h-12 w-12 rounded-xl text-white hover:bg-white/20 hover:text-white">
                        <MoreVertical className="h-8 w-8" />
                    </Button>
                </DropdownMenuTrigger>

                {/* The actual popup menu */}
                <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-700 text-zinc-100">
                    <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-red-950 focus:bg-red-950 focus:text-red-400">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}