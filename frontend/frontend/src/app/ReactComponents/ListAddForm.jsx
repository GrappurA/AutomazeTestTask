import { supabase } from "../../../lib/supabase"

export default function ListAddForm({ onListAdded }) {

    async function handleAddList(e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const { data: { user } } = await supabase.auth.getUser()
        try {
            const { data, error } = await supabase
                .from('todo_lists')
                .insert({
                    title: formData.get('title'),
                    user_id: user.id
                })
            if (!error) {
                e.target.reset()
                if (onListAdded) onListAdded()
            }
            if (error)
                throw new Error('Error during inserting a list')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full max-w-2xl mt-1">
            <form
                onSubmit={handleAddList}
                // Horizontal structure: flex-row layout with items aligned inline
                className="bg-[#22223b] border-2 border-[#4a4e69] rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3 shadow-md select-none w-full"
            >
                {/* Input Container */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-1 w-full">
                    <label
                        htmlFor="title"
                        className="text-xs font-bold uppercase tracking-wider text-[#f2e9e4] whitespace-nowrap sm:pl-2"
                    >
                        List Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        placeholder="Enter list name..."
                        className="w-full bg-[#4a4e69]/30 border-2 border-[#4a4e69] rounded-lg px-3 py-2 text-sm text-[#f2e9e4] placeholder:text-[#9a8c98] focus:outline-none focus:border-[#c9ada7] transition-all"
                    />
                </div>

                {/* Submit Action */}
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#c9ada7] hover:bg-[#9a8c98] text-[#22223b] font-bold text-sm px-5 py-2 rounded-lg transition-colors shadow-sm whitespace-nowrap"
                >
                    Add List
                </button>
            </form>
        </div>
    )
}