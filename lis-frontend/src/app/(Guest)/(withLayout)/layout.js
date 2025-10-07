import '@/app/globals.css'
import Navbar from '@/pages/guest/navbar.js'

export default function RegistrationFormLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
