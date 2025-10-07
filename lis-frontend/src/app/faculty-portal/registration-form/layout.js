import '@/app/globals.css'
import WideStatusText from '@/components/WideStatusText'

export const metadata = {
    // title: 'Registration Form',
}

export default function RegistrationFormLayout({ children }) {
    return (
        <>
            <WideStatusText />
            <div className="mx-3 mb-20 mt-5 sm:mx-5 md:mx-12 xl:mx-14 2xl:mx-20">
                {children}
            </div>
        </>
    )
}
