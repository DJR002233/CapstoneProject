import InputFields from '@/pages/admin/staff_management/inputs'
import Search_table_select from '@/pages/admin/staff_management/search_table_select'
import { getAllLocations } from '@/app/_lib/fetch'

export default async function Admin() {
    return (
        <>
            <p className="my-3 text-center text-lg font-bold">
                Staff Management
            </p>
            <div className="xl:flex">
                <InputFields locations={await getAllLocations()} />
                <Search_table_select />
            </div>
        </>
    )
}
