import { dashboard_data } from '@/app/_lib/fetch'
import Graphs from '@/pages/faculty/dashboard/graphs'

export default async function Dashboard() {
    const data = await dashboard_data()
    // console.log(data)
    return (
        <div className="mx-5 mb-5 2xl:mx-24">
            <p className="mt-2 text-lg font-bold">Dashboard</p>
            <p className="text-center text-xl">
                <span>
                    <strong>Greetings</strong>
                    {' ' + data.name}
                </span>
            </p>
            <p className="mt-5">Number of registrations today: {data.count}</p>
            <Graphs
                dates={data.week}
                ratio={data.ratio}
                cur_date={data.current_date}
            />
        </div>
    )
}
