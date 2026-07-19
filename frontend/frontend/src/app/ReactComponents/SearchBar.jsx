
export default function SearchBar({ showsTasks }) {

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#22223b] border-2 border-[#4a4e69] rounded-xl p-2 mt-4 w-full max-w-3xl shadow-md gap-3 select-none">

            {/* Left Side: Title */}
            <div className="flex-shrink-0 px-4 py-2 sm:border-r-2 border-[#4a4e69]/60 w-full sm:w-auto text-center sm:text-left">
                <h2 className="text-lg font-bold tracking-wider text-[#c9ada7] uppercase">
                    Your {showsTasks ? 'Tasks' : 'Lists'}
                </h2>
            </div>

            {/* Right Side: Search Controls */}
            <div className="flex flex-1 items-center gap-2 w-full px-2">
                <input
                    type="text"
                    placeholder={`Search ${showsTasks ? 'tasks' : 'lists'}...`}
                    className="w-full bg-[#4a4e69]/30 border-2 border-[#4a4e69] rounded-lg px-3 py-2 text-sm text-[#f2e9e4] placeholder:text-[#9a8c98] focus:outline-none focus:border-[#c9ada7] transition-all"
                />
                <button className="bg-[#c9ada7] hover:bg-[#9a8c98] text-[#22223b] font-bold text-sm px-5 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm">
                    Search
                </button>
            </div>

        </div>
    )
}