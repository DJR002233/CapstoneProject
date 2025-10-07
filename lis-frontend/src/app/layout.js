import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Putatan Child Development Center',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className + ' ' + 'text-black'}>
                {children}
            </body>
            {/* <body>{children}</body> */}
        </html>
    )
}
