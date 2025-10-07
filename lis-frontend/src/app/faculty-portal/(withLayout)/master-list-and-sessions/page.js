import Controls from '@/pages/faculty/masterlistandsessions/controls'
import Sessions from '@/pages/faculty/masterlistandsessions/sessions'
import Table from '@/pages/faculty/masterlistandsessions/table'
import '@/css/tableBorder.css'
export default function Masterlist() {
    return (
        <>
            <p className="my-3 text-center text-lg font-bold">
                Masterlist and Sessions
            </p>
            <Sessions />
            <Table />
            <Controls />
        </>
    )
}
