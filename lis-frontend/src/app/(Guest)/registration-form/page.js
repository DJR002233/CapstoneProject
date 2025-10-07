import { verify_registration_form } from '@/app/_lib/fetch'
import Form from '@/pages/guest/child-registration-form/form'
import { redirect } from 'next/navigation'

export default async function Home({ searchParams }) {
    const sp = await searchParams,
        form_is_available = await verify_registration_form(
            sp.location_number,
            sp.location_name
        )
    if (form_is_available.status != 'available')
        return redirect('available-locations')
    return (
        <div>
            <Form
                location_id={sp.location_number}
                location_name={sp.location_name}
            />
        </div>
    )
}
