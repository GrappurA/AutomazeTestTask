export default function SearchBar({
    showsTasks,
    setSearchQuery,
    searchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
}) {

    const statusOptions = ["All", "Done", "Undone"]
    const priorityOptions = ["All", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // Grey (#9a8c98) at 0 -> Red (#bd3f3e) at 10, interpolated per level
    const getPriorityColor = (level) => {
        if (level === "All") return "#f2e9e4"

        const grey = { r: 154, g: 140, b: 152 } // #9a8c98
        const red = { r: 189, g: 63, b: 62 }    // #bd3f3e
        const ratio = level / 10

        const r = Math.round(grey.r + (red.r - grey.r) * ratio)
        const g = Math.round(grey.g + (red.g - grey.g) * ratio)
        const b = Math.round(grey.b + (red.b - grey.b) * ratio)

        return `rgb(${r}, ${g}, ${b})`
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#22223b] border-2 border-[#4a4e69] rounded-xl p-2 mt-4 w-full shadow-md gap-3 select-none">

            {/* Left Side: Title */}
            <div className="flex-shrink-0 px-4 py-2 sm:border-r-2 border-[#4a4e69]/60 w-full sm:w-auto text-center sm:text-left">
                <h2 className="text-lg font-bold tracking-wider text-[#c9ada7] uppercase">
                    Your {showsTasks ? 'Tasks' : 'Lists'}
                </h2>
            </div>

            {/* Right Side: Search Controls */}
            <div className="flex flex-1 flex-wrap items-center gap-2 w-full px-2">
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    type="text"
                    required
                    placeholder={`Search ${showsTasks ? 'tasks' : 'lists'}...`}
                    className="flex-1 min-w-[120px] bg-[#4a4e69]/30 border-2 border-[#4a4e69] rounded-lg px-3 py-2 text-sm text-[#f2e9e4] placeholder:text-[#9a8c98] focus:outline-none focus:border-[#c9ada7] transition-all"
                />

                <button
                    onClick={() => setSearchQuery("")}
                    className=" bg-[#bd3f3e] hover:bg-[#9a8c98] text-[#22223b] font-bold text-sm px-5 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                    clear
                </button>

                {/* Status Filter Buttons — always visible, disabled when viewing Lists */}
                <div className={`flex items-center gap-1 bg-[#4a4e69]/20 border-2 border-[#4a4e69] rounded-lg p-1 transition-opacity ${!showsTasks ? "opacity-40 pointer-events-none" : ""}`}>
                    {statusOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => setStatusFilter(option)}
                            disabled={!showsTasks}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-colors ${statusFilter === option
                                ? "bg-[#c9ada7] text-[#22223b]"
                                : "text-[#f2e9e4] hover:bg-[#4a4e69]/50"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Priority Filter Buttons (0-10 scale, grey -> red) — always visible, disabled when viewing Lists */}
                <div className={`flex items-center gap-1 bg-[#4a4e69]/20 border-2 border-[#4a4e69] rounded-lg p-1 transition-opacity ${!showsTasks ? "opacity-40 pointer-events-none" : ""}`}>
                    {priorityOptions.map((option) => {
                        const isSelected = priorityFilter === option
                        const color = getPriorityColor(option)

                        return (
                            <button
                                key={option}
                                onClick={() => setPriorityFilter(option)}
                                disabled={!showsTasks}
                                style={
                                    isSelected
                                        ? { backgroundColor: color }
                                        : { color: color }
                                }
                                className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold whitespace-nowrap transition-colors ${isSelected ? "text-[#22223b]" : "hover:bg-[#4a4e69]/50"
                                    }`}
                            >
                                {option}
                            </button>
                        )
                    })}
                </div>

                <button className="bg-[#c9ada7] hover:bg-[#9a8c98] text-[#22223b] font-bold text-sm px-5 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm">
                    Search
                </button>
            </div>

        </div>
    )
}