import Locations from '@/pages/guest/child-registration-form/locations'
import { available_locations } from '@/app/_lib/fetch'

export default async function Home() {
    const data = await available_locations()
    return (
        <div>
            <Locations available_location={data} />
        </div>
    )
}
