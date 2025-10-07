import { getLocationCookies } from '@/app/_lib/cookies'
import { dashboard_data } from '@/app/_lib/fetch'
import Graphs from '@/pages/faculty/dashboard/graphs'

export default async function Dashboard() {
    const location_cookies = await getLocationCookies(),
        data = await dashboard_data(location_cookies)
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
