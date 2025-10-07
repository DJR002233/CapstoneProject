'use client'

import { faculty_logout } from '@/app/_lib/fetch'
import { inprogress } from '@/components/WideStatusText'
import { useRouter } from 'next/navigation'

export default function LogoutBtn() {
    const router = useRouter()
    return (
        <section className="ms-auto bg-red-200 md:rounded-e-xl">
            <button
                className="w-full rounded-e-xl bg-red-200 px-5 py-3 text-left sm:px-5"
                onClick={logout}
                type="button"
            >
                Log out
            </button>
        </section>
    )
    async function logout() {
        const main_div = document.getElementById('main_div')
        inprogress('logging out...')
        main_div.className =
            'mx-0 sm:mx-5 md:mx-12 xl:mx-14 2xl:mx-16' +
            ' ' +
            'opacity-50 pointer-events-none'
        document.cookie =
            'registration_forms_selected_row=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        document.cookie =
            'session_value=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        document.cookie =
            'selected_location=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'

        await faculty_logout()
        router.push('/login-portal', { shallow: true })
    }
}
