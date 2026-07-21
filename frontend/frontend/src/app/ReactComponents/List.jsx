"use client"

import Image from "next/image"
import filledStarIcon from '../../../public/filledStarIcon.png'
import unfilledStarIcon from '../../../public/unfilledStarIcon.png'
import { useState } from "react"
import OpenedListView from "./OpenedList"

// Note: Ensure you pass 'id' here so we can give it to the OpenedListView
export default function List({ id, title, isDone, donePercentage, createdAt }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* The Closed Card View */}
            <div
                onClick={() => setIsOpen(true)}
                className="flex flex-col bg-[#22223b] border-2 border-[#4a4e69] hover:border-[#c9ada7] transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer rounded-xl w-full max-w-2xs mt-4 shadow-lg text-[#f2e9e4] overflow-hidden select-none"
            >
                {/* Header: Title & Star */}
                <div className="flex justify-between items-center p-4 bg-[#4a4e69]/20 border-b-2 border-[#4a4e69]">
                    <p className="text-xl font-bold tracking-wide truncate pr-4 text-[#f2e9e4]">
                        {title}
                    </p>
                    <div className="shrink-0 flex items-center justify-center bg-[#4a4e69]/40 p-2 rounded-lg cursor-pointer hover:bg-[#4a4e69]/80 transition-colors active:scale-95">
                        <Image
                            src={isDone ? filledStarIcon : unfilledStarIcon}
                            width={32}
                            height={32}
                            alt={isDone ? 'Completed' : 'Pending'}
                        />
                    </div>
                </div>

                {/* Stats Container */}
                <div className="flex flex-col">
                    {/* Progress Row */}
                    <div className="flex justify-between items-center px-4 py-3 border-b border-[#4a4e69]/50">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8c98]">
                            Progress
                        </span>
                        <span className="text-sm font-bold text-[#f2e9e4]">
                            {donePercentage || 0}%
                        </span>
                    </div>

                    {/* Created Row */}
                    <div className="flex justify-between items-center px-4 py-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8c98]">
                            Created
                        </span>
                        <span className="text-sm font-bold text-[#f2e9e4]">
                            {createdAt || 0}
                        </span>
                    </div>
                </div>
            </div>

            {/* The Full-Screen Opened View */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#9a8c98] p-2 sm:p-6 backdrop-blur-sm">
                    {/* 
                      We pass the exact data from this card down into the opened view. 
                      No need to fetch the list details again! 
                    */}
                    <OpenedListView
                        list={{ id, title, isDone, donePercentage, createdAt }}
                        onBack={(e) => {
                            e.stopPropagation() // Prevents the card underneath from being clicked
                            setIsOpen(false)
                        }}
                    />
                </div>
            )}
        </>
    )
}