import Loginpage from '@/pages/guest/login-page/login'
import { redirect } from 'next/navigation'
export const metadata = {
    title: 'Login Page',
}
export default async function FacultyPortal(props) {
    const searchParams = await props.searchParams,
        user = searchParams.u == 1 ? 1 : 0
    if (!searchParams.u) redirect('/login-portal?u=0', 'replace')
    return (
        <div>
            <Loginpage user={user} />
        </div>
    )
}
