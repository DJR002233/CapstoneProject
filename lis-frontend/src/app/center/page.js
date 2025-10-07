import Link from 'next/link'
import Image from 'next/image'
import '@/css/tableBorder.css'
import '@/css/shapes.css'
import '@/css/writing-mode.css'
import '@/css/bg-color.css'
import '@/css/border-color.css'
import '@/css/width.css'
import Grades from '@/pages/center/grades'
import SimpleTable from '@/app/_lib/simpletableview'
import Scores from '@/pages/faculty/gradesandmappingvisualization/scores'
import { get_active_location_list } from '@/app/_lib/fetch'

export default async function Center() {
    const className = {
        div: 'max-h-screen-60 mb-2 w-full overflow-x-auto overflow-y-auto bg-slate-300',
        table: 'w-full text-center',
        thead: 'sticky top-0 bg-color-yellow cursor-default',
        tbody: 'bg-white',
        tr: '',
        td: 'border-2 border-gray-500 h-8 bg-white cursor-pointer',
    },
        id = {
            table: 'child_information_table',
        }
    return (
        <div className="mx-0 sm:mx-5 md:mx-12 xl:mx-14 2xl:mx-16">
            <div className="text-black">
                <div className="flex items-center py-5">
                    <Image
                        src="/logo.jpg"
                        width={75}
                        height={75}
                        alt="Picture of the author"
                    />
                    <h3 className="max-w-30 ms-2 mt-2 flex text-5xl">Center</h3>
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
            </div>
            <Grades available_locations={await get_active_location_list()} />
            <SimpleTable className={className} id={id} />
            <br />
            <Scores />
            <br />
        </div>
    )
}
