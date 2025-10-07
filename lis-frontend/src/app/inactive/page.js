import Link from 'next/link'
import Image from 'next/image'
export default function Inactive() {
    return (
        <div className="mx-0 text-black sm:mx-5 md:mx-12 xl:mx-14 2xl:mx-16">
            <div className="flex items-center py-5">
                <Image
                    src="/logo.jpg"
                    width={75}
                    height={75}
                    alt="Picture of the author"
                />
                <h3 className="max-w-30 ms-2 mt-2 flex text-5xl">
                    Faculty Portal
                </h3>
            </div>

            <nav className="flex rounded-xl border bg-blue-50">
                <section className="ms-auto flex rounded-e-xl bg-red-200">
                    <Link href="/log-out">
                        <p className="rounded-e-xl bg-red-200 px-5 py-3 sm:px-5">
                            Log out
                        </p>
                    </Link>
                </section>
            </nav>
            <h3 className="mt-10 text-center text-2xl">
                Your account is currently inactive
            </h3>
        </div>
    )
}
