import Link from 'next/link'
import Image from 'next/image'
import LogoutBtn from './logout_button'
import { LocationandSchoolYear } from '@/app/_lib/fetch'
import { inprogress } from '@/components/WideStatusText'
import { toggle_settings } from './navbar_client'

export default async function Navbar() {
    const getLSY = await LocationandSchoolYear(),
        year = new Date(getLSY['date']).getFullYear()
    let sy = ''
    if (year) sy = 'SY: ' + year + '-' + (year + 1)
    return (
        <div className="text-black">
            <div className="flex items-center py-2">
                <Image
                    src="/logo.jpg"
                    width={50}
                    height={50}
                    alt="Picture of the author"
                />
                <h3 className="max-w-30 ms-1 flex text-2xl font-bold">
                    Faculty Portal
                </h3>
                <p className="ms-auto flex flex-wrap gap-x-2 divide-x divide-black font-bold">
                    <span className="ms-2 text-nowrap">{sy}</span>
                    <span className="ps-2">
                        {'Location: ' +
                            getLSY['location_name'] +
                            ' (' +
                            getLSY['location'] +
                            ')'}
                    </span>
                </p>
            </div>

            <nav className="faculty-overflow-y-hidden relative flex rounded-xl border bg-blue-50 md:rounded-s-xl">
                <input
                    className="faculty-menu-btn hidden"
                    type="checkbox"
                    id="menu-btn"
                />
                <label
                    className="flex bg-slate-300 md:hidden"
                    htmlFor="menu-btn"
                >
                    <Image
                        className="my-auto"
                        src="/hamburger_icon.png"
                        width={60}
                        height={60}
                        alt="dropdownmenu"
                    />
                </label>
                <section className="faculty-menu mt-auto w-full md:mt-0 md:flex md:divide-x md:divide-solid md:divide-black md:divide-opacity-20">
                    <Link href="/faculty-portal/dashboard" title="Dashboard">
                        <p className="px-4 py-3 sm:px-5" onClick={inprogress}>
                            Dashboard
                        </p>
                    </Link>
                    <Link
                        href="/faculty-portal/registration-forms"
                        title="Child Registration Forms"
                    >
                        <p className="px-4 py-3 sm:px-5" onClick={inprogress}>
                            Registration Forms
                        </p>
                    </Link>
                    <Link
                        href="/faculty-portal/master-list-and-sessions"
                        title="Masterlist and Sessions"
                    >
                        <p className="px-4 py-3 sm:px-5" onClick={inprogress}>
                            Masterlist
                        </p>
                    </Link>
                    <Link
                        href="/faculty-portal/grades-and-mapping-visualization"
                        title="Grades and Mapping Visualization"
                    >
                        <p className="px-4 py-3 sm:px-5" onClick={inprogress}>
                            Grades
                        </p>
                    </Link>
                    <Link href="/faculty-portal/archives" title="Archives">
                        <p className="px-4 py-3 sm:px-5" onClick={inprogress}>
                            Archives
                        </p>
                    </Link>
                    <div className="relative ms-auto">
                        <button
                            className="faculty-rounded-br-lg flex h-full w-full items-center gap-x-1 rounded-e-lg bg-blue-300 px-3 py-2"
                            id="gear_button"
                            onClick={toggle_settings}
                        >
                            <Image
                                className="pointer-events-none mx-auto"
                                src="/gear_icon.png"
                                height={30}
                                width={30}
                                alt="settings"
                            />
                        </button>
                        <div
                            className="faculty-absolute right-0 z-10 hidden bg-blue-200"
                            id="gear_icon"
                        >
                            <Link
                                href="/faculty-portal/account-settings"
                                title="Archives"
                            >
                                <p
                                    className="px-4 py-3 sm:px-5"
                                    onClick={inprogress}
                                >
                                    Settings
                                </p>
                            </Link>
                            <div className="bg-red-200">
                                <LogoutBtn />
                            </div>
                        </div>
                    </div>
                </section>
            </nav>
        </div>
    )
}
