import Image from "next/image"
import filledStarIcon from '../../../public/filledStarIcon.png'
import unfilledStarIcon from '../../../public/unfilledStarIcon.png'

export default function List(props) {

    return (
        <div className="flex flex-col bg-[#22223b] border-2 border-[#4a4e69] rounded-xl w-full max-w-2xs mt-4 shadow-lg text-[#f2e9e4] overflow-hidden select-none">

            {/* Header: Title & Star */}
            <div className="flex justify-between items-center p-4 bg-[#4a4e69]/20 border-b-2 border-[#4a4e69]">
                <p className="text-xl font-bold tracking-wide truncate pr-4 text-[#f2e9e4]">
                    {props.title}
                </p>
                {/* Star wrapped in a subtle background circle/box for emphasis */}
                <div className="shrink-0 flex items-center justify-center bg-[#4a4e69]/40 p-2 rounded-lg cursor-pointer hover:bg-[#4a4e69]/60 transition-colors">
                    <Image
                        src={props.isDone ? filledStarIcon : unfilledStarIcon}
                        width={32}
                        height={32}
                        alt={props.isDone ? 'Completed' : 'Pending'}
                    />
                </div>
            </div>

            {/* Stats Container */}
            <div className="flex flex-col">
                {/* Tasks Row */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-[#4a4e69]/50">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8c98]">
                        Tasks
                    </span>
                    <span className="text-sm font-bold text-[#c9ada7]">
                        3 / 5
                    </span>
                </div>

                {/* Progress Row */}
                <div className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8c98]">
                        Progress
                    </span>
                    <span className="text-sm font-bold text-[#f2e9e4]">
                        {props.donePercentage || 0}%
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8c98]">
                    Created
                </span>
                <span className="text-sm font-bold text-[#f2e9e4]">
                    {props.createdAt || 0}%
                </span>
            </div>

        </div>
    )
}