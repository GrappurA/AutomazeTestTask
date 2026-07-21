"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { useEffect, useState } from "react";
import ListAddForm from './ReactComponents/ListAddForm'
import List from "./ReactComponents/List";
import SearchBar from "./ReactComponents/SearchBar";
import { supabase } from "../../lib/supabase"


export default function Home() {
  const [showsTasks, setShowTasks] = useState(false)
  const [lists, setLists] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchLists = async () => {
    setIsLoading(true)
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

  useEffect(() => {
    fetchLists()
  }, [])

  return (
    <div className="w-screen p-2">

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

      {/* main space */}
      <div className="mt-2">
        <div className="border-b-4 rounded-xs w-[99%] border-b-[#22223b] pb-4">
          <ListAddForm onListAdded={fetchLists} />
        </div>

        <SearchBar showsTasks={showsTasks} />
      </div>

      <div className="grid grid-cols-5 justify-between">
        {lists.length === 0 ? (
          <p className="text-[#4A4E69]">You don't have any lists yet.</p>
        ) : (
          lists.map((list, index) => (
            // This is where you'd map over your styled ListItem component!
            <List key={list.id} index={index} id={list.id} title={list.title} donePercentage={list.done_percentage} createdAt={list.created_at} isDone={list.is_done} />

          ))
        )}
      </div>
    </div>
  );
}
