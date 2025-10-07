import SimpleTable from '@/app/_lib/simpletableview'
import ArchiveControls from '@/pages/faculty/archives/controls'
import { getSchoolYears } from '@/app/_lib/fetch'

export default async function Archives() {
    const className = {
            div: 'w-full mb-10 overflow-y-auto overflow-x-auto relative max-h-screen-60',
            table: 'w-full text-center',
            thead: 'sticky top-0 cursor-default',
            td: 'border border-white bg-blue-100 h-6 cursor-pointer',
        },
        id = { table: 'archives_table' }
    return (
        <>
            <p className="my-3 text-center text-lg font-bold">Archives</p>
            <ArchiveControls school_years={await getSchoolYears()} />
            <SimpleTable className={className} id={id} />
        </>
    )
}
