import '@/app/globals.css'
import WideStatusText from '@/components/WideStatusText'
import Navbar from '@/pages/faculty/navbar.js'

export default function DashboardLayout({ children }) {
    return (
        <>
            <WideStatusText />
            <div
                className="mx-0 sm:mx-5 md:mx-12 xl:mx-14 2xl:mx-16"
                id="main_div"
            >
                <Navbar />
                {children}
            </div>
        </>
    )
}
