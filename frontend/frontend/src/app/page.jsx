"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { useState } from "react";
import ListAddForm from './ReactComponents/ListAddForm'
import List from "./ReactComponents/List";


export default function Home() {
  const [showsTasks, setShowTasks] = useState(false)
  return (
    <div className="w-screen h-full">
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
        <ListAddForm />

        <hr className="mt-2 border-3 border-[#22223b] w-[98%] mx-auto rounded-xl" />
        <p className="text-xl bg-[#22223b] text-[#C9ADA7] mx-auto p-2 mt-2 w-fit rounded-xl border-3]">Your {showsTasks ? 'Tasks' : 'Lists'}</p>
      </div>

      <List title={"title1"} donePercentage={50} />
    </div>
  );
}
