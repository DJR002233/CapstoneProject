import '@/app/globals.css'
import Header from '@/pages/guest/child-registration-form/header'

export const metadata = {
    title: 'Registration Form',
}

export default function RegistrationFormLayout({ children }) {
    return (
        <div className="mx-3 mb-20 mt-5 sm:mx-5 md:mx-12 xl:mx-14 2xl:mx-20">
            <Header />
            {children}
        </div>
    )
}
