'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { faculty_logout } from '../_lib/fetch'
export default function Unauthenticated() {
    const router = useRouter()
    useEffect(() => {
        logout()
        async function logout() {
            alert(
                'Unauthenticated. Please try logging in again\n\nYou will be redirected to the login portal'
            )
            await faculty_logout()
            router.replace('/login-portal', { shallow: true })
        }
    })
}
