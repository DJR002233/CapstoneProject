import SimpleTable from '@/app/_lib/simpletableview'
import Panel from '@/pages/admin/registrationforms/panel'

export default function Regforms() {
    const className = {
            div: 'w-full mb-5 overflow-y-auto overflow-x-auto relative max-h-screen-60',
            table: 'w-full text-center',
            thead: 'sticky top-0 cursor-default',
            td: 'border border-white bg-blue-100 h-6 cursor-pointer',
        },
        id = { table: 'registration_forms_table' }
    return (
        <>
            <p className="my-3 text-center text-lg font-bold">
                Child Registration Forms
            </p>
            <Panel />
            <SimpleTable className={className} id={id} />
        </>
    )
}
