import Link from 'next/link'
import Image from 'next/image'
import { AllLocationandSchoolYear } from '@/app/_lib/fetch'
import LocationDropDown, { adminPages } from './adminheader_client'
import { inprogress } from '@/components/WideStatusText'
import LogoutBtn from '../faculty/logout_button'
export default async function Adminheader({ location }) {
    const getLSY = await AllLocationandSchoolYear(),
        year = new Date(getLSY['date']).getFullYear(),
        locations = getLSY['locations']
    let sy = '',
        selected = getLSY['location']
    if (year) sy = 'SY: ' + year + '-' + (year + 1)
    // const location_cookies = location
    if (location) selected = location
    return (
        <div className="text-black">
            <div className="flex items-center py-2">
                <Image
                    src="/logo.jpg"
                    width={50}
                    height={50}
                    alt="Picture of the author"
                />
                <h3 className="max-w-30 me-2 ms-2 mt-1 flex text-2xl font-bold">
                    Admin
                </h3>
                <p className="ms-auto flex flex-wrap items-center gap-x-2 divide-x divide-black font-bold">
                    <span className="ms-2 text-nowrap">{sy}</span>
                    <span className="ps-2">
                        {'Location: '}
                        <LocationDropDown
                            locations={locations}
                            selected_location={selected}
                        />
                    </span>
                </p>
            </div>

            <nav className="admin-overflow-hidden flex rounded-xl bg-blue-50">
                <input
                    className="admin-menu-btn hidden"
                    type="checkbox"
                    id="menu-btn"
                />
                <label
                    className="admin-show hidden bg-slate-300"
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
                <section className="admin-menu admin-flex mt-auto w-full items-center divide-x-2 divide-black divide-opacity-10 rounded-xl border">
                    <Link
                        className="admin-justify-center flex h-12 items-center px-5"
                        href="/admin/dashboard"
                        title="Dashboard"
                        onClick={inprogress}
                    >
                        Dashboard
                    </Link>
                    <Link
                        className="admin-justify-center flex h-12 items-center px-5"
                        href="/admin/registration-forms"
                        title="Child Registration Forms"
                        onClick={inprogress}
                    >
                        Registration Forms
                    </Link>
                    <Link
                        className="admin-justify-center flex h-12 items-center px-5"
                        href="/admin/master-list-and-sessions"
                        title="Masterlist and Sessions"
                        onClick={inprogress}
                    >
                        Masterlist
                    </Link>
                    <Link
                        className="admin-justify-center flex h-12 items-center px-5"
                        href="/admin/grades-and-mapping-visualization"
                        title="Grades and Mapping Visulization"
                        onClick={inprogress}
                    >
                        Grades
                    </Link>
                    <Link
                        className="admin-justify-center flex h-12 items-center px-5"
                        href="/admin/archives"
                        title="Dashboard"
                        onClick={inprogress}
                    >
                        Archives
                    </Link>
                    <div className="admin-relative">
                        <button
                            className="flex h-12 w-full items-center gap-x-1 px-5"
                            id="dropdownBtn"
                            onClick={adminPages}
                        >
                            Admin Controls <span className="opacity-30">▼</span>
                        </button>
                        <div
                            className="admin-absolute mix-w-fit admin-w-56 top-full z-10 hidden flex-col divide-y divide-black divide-opacity-20 rounded-md border border-blue-300 bg-blue-100"
                            id="admincomboBox"
                        >
                            <Link
                                className="admin-ps-14 px-2 py-4"
                                href="/admin/staff-management"
                                title="Staff Account Management"
                                onClick={inprogress}
                            >
                                Staff management
                            </Link>
                            <Link
                                className="admin-ps-14 px-2 py-4"
                                href="/admin/development-center-management"
                                title="Development Center Management"
                                onClick={inprogress}
                            >
                                Development Center Management
                            </Link>
                        </div>
                    </div>
                    <LogoutBtn />
                </section>
            </nav>
        </div>
    )
}
