"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { useState } from "react";
import ListAddForm from './ReactComponents/ListAddForm'
import List from "./ReactComponents/List";
import SearchBar from "./ReactComponents/SearchBar";


export default function Home() {
  const [showsTasks, setShowTasks] = useState(false)
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
          <ListAddForm />
        </div>

        <SearchBar showsTasks={showsTasks} />
      </div>

      <div className="grid grid-cols-5 justify-between">
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} /><List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} /><List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
        <List title={"title1"} donePercentage={50} />
      </div>
    </div>
  );
}
