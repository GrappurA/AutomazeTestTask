"use client"

import Image from "next/image"
import filledStarIcon from '../../../public/filledStarIcon.png'
import unfilledStarIcon from '../../../public/unfilledStarIcon.png'
import { AlertCircle, Calendar } from 'lucide-react'

export default function Task({ id, title, isDone, priority, createdAt, onStatusToggle, onPriorityChange }) {
    // Format the date just like the List component
    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
        : 'Unknown'

    // Priority is 0-10. Grey (#9a8c98) at 0 -> Red (#bd3f3e) at 10.
    const priorityLevel = Number(priority ?? 0)

    const getPriorityColor = (level) => {
        const grey = { r: 154, g: 140, b: 152 } // #9a8c98
        const red = { r: 189, g: 63, b: 62 }    // #bd3f3e
        const ratio = Math.min(Math.max(level, 0), 10) / 10

        const r = Math.round(grey.r + (red.r - grey.r) * ratio)
        const g = Math.round(grey.g + (red.g - grey.g) * ratio)
        const b = Math.round(grey.b + (red.b - grey.b) * ratio)

        return `rgb(${r}, ${g}, ${b})`
    }

    const priorityColor = getPriorityColor(priorityLevel)

    return (
        <div className="flex flex-col bg-[#22223b] border-2 border-[#4a4e69] hover:border-[#c9ada7] transition-all hover:-translate-y-1 hover:shadow-xl rounded-xl w-full max-w-2xs mt-4 shadow-lg text-[#f2e9e4] overflow-hidden select-none">

            {/* Header: Title & Status */}
            <div className="flex justify-between items-center p-4 bg-[#4a4e69]/20 border-b-2 border-[#4a4e69]">
                <p className={`text-lg font-bold tracking-wide truncate pr-4 transition-colors ${isDone ? 'text-[#9a8c98] line-through' : 'text-[#f2e9e4]'}`}>
                    {title}
                </p>
                <div className="shrink-0 flex items-center justify-center bg-[#4a4e69]/40 p-2 rounded-lg cursor-default">
                    <Image
                        onClick={() => { onStatusToggle(id, isDone) }}
                        src={isDone ? filledStarIcon : unfilledStarIcon}
                        width={28}
                        height={28}
                        alt={isDone ? 'Completed' : 'Pending'}
                    />
                </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col">
                {/* Priority Row */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-[#4a4e69]/50">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8c98]">
                        Priority
                    </span>
                    <span
                        style={{
                            color: priorityColor,
                            backgroundColor: `${priorityColor}1A`, // ~10% opacity fill
                            borderColor: `${priorityColor}33`,     // ~20% opacity border
                        }}
                        className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md border"
                    >
                        {priorityLevel > 0 && <AlertCircle className="w-3 h-3" />}
                        {priorityLevel}
                    </span>
                </div>

                {/* Created Date Row */}
                <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8c98]">
                        Created
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-[#f2e9e4]">
                        <Calendar className="w-4 h-4 text-[#9a8c98]" />
                        {formattedDate}
                    </span>
                </div>
            </div>
        </div>
    )
}