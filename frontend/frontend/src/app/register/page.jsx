"use client"

import { redirect } from "next/navigation"
import { supabase } from "../../../lib/supabase"


export default function RegisterPage() {

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const email = formData.get("email")
        const password = formData.get("password")

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        if (error) {
            alert(`Error during register process ${error}`)
        }
    }
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4">

            <form
                onSubmit={handleSubmit}
                className="bg-[#22223b] border-4 border-[#4a4e69] rounded-2xl w-full max-w-sm p-8 flex flex-col gap-5 shadow-2xl select-none"
            >
                {/* Header Section */}
                <div className="text-center mb-2">
                    <h2 className="text-3xl font-bold tracking-wide text-[#c9ada7] uppercase">
                        Welcome !
                    </h2>
                    <p className="text-[#9a8c98] text-sm mt-1">
                        Sign up to start planning your stuff
                    </p>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="email"
                        className="text-xs font-semibold uppercase tracking-wider text-[#f2e9e4]"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name='email'

                        placeholder="you@example.com"
                        className="w-full bg-[#4a4e69]/30 border-2 border-[#4a4e69] rounded-xl px-4 py-2.5 text-sm text-[#f2e9e4] placeholder:text-[#9a8c98] focus:outline-none focus:border-[#c9ada7] transition-all"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="password"
                        className="text-xs font-semibold uppercase tracking-wider text-[#f2e9e4]"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        placeholder="••••••••"
                        className="w-full bg-[#4a4e69]/30 border-2 border-[#4a4e69] rounded-xl px-4 py-2.5 text-sm text-[#f2e9e4] placeholder:text-[#9a8c98] focus:outline-none focus:border-[#c9ada7] transition-all"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-4 w-full bg-[#c9ada7] hover:bg-[#9a8c98] text-[#22223b] font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-md uppercase tracking-wide"
                >
                    Sign Up
                </button>

                {/* Optional Footer Link */}
                <div className="text-center mt-2">
                    <p onClick={() => { redirect('/login') }} className="text-xs text-[#9a8c98] hover:text-[#c9ada7] transition-colors">
                        Already have an account? Sign In
                    </p>
                </div>
            </form>

        </div>
    )
}