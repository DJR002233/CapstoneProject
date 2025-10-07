import Link from 'next/link'
import Image from 'next/image'
export default function navbar() {
    return (
        <div className="mx-5 md:mx-14 lg:mx-20">
            <div className="flex items-center py-1">
                <Image src="/logo.jpg" width={75} height={75} alt="logo" />
                <h3 className="max-w-30 ms-2 mt-2 flex text-xl text-black">
                    Putatan Child <br />
                    Development Center
                </h3>
                <Image
                    className="ms-auto"
                    src="/homeNav.jpg"
                    width={195}
                    height={145}
                    alt="logo of muntinlupa"
                />
            </div>

            <nav className="mx-auto mt-1 flex divide-x divide-solid divide-black divide-opacity-20 rounded-xl border bg-blue-300 text-black">
                <Link href="/home">
                    <p className="px-4 py-3 sm:px-5">Home</p>
                </Link>
                <Link href="/events">
                    <p className="px-4 py-3 sm:px-5">Events</p>
                </Link>
                {/* <Link href="/login-portal">
                    <p className="px-4 py-3 sm:px-5">Login Portal</p>
                </Link> */}
                <Link href="/available-locations">
                    <p className="px-4 py-3 sm:px-5">
                        Child Registeration Form
                    </p>
                </Link>
                <section className="ms-auto">
                    <Link href="/view-grades">
                        <p className="px-4 py-3 sm:px-5">View Grade</p>
                    </Link>
                </section>
            </nav>
        </div>
    )
}
