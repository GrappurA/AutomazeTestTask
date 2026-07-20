"use client"

import { useState, useEffect } from "react";
import { supabase } from '../../../lib/supabase'
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session && pathname == '/login') {
                router.replace('/login')
                setIsChecking(false)
            }
            else if (!session && pathname == '/register') {
                router.replace('/register')
                setIsChecking(false)
            }
            else if (session && pathname == '/login' || pathname == '/register') {
                router.replace('/')
                setIsChecking(false)
            }

            else {
                setIsChecking(false)
            }
        }
        checkAuth()

        const { data: { authListener } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session == null && pathname !== '/login') {
                router.replace('/login')
            }
            else if (session !== null && pathname == '/login') {
                router.replace('/')
            }
        })

        return (() => {
            authListener?.subscription?.unsubscribe()
        })

    }, [pathname, router])

    if (isChecking) {
        return <div className="flex items-center justify-center text-center h-screen w- screen">Wait a bit...</div>
    }

    return (<>{children}</>)
}