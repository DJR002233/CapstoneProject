import { getLocationCookies } from '@/app/_lib/cookies'
import '@/app/globals.css'
import WideStatusText from '@/components/WideStatusText'
import Adminheader from '@/pages/admin/adminheader'

export default async function DashboardLayout({ children }) {
    return (
        <>
            <WideStatusText />
            <div
                className="mx-0 sm:mx-5 md:mx-12 xl:mx-14 2xl:mx-16"
                id="main_div"
            >
                <Adminheader location={await getLocationCookies()} />
                {children}
            </div>
        </>
    )
}
