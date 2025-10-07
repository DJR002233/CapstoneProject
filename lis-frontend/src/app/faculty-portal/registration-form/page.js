import { getProfilePicture, view_profile } from '@/app/_lib/fetch'
import Header from '@/pages/faculty/registrationforms/header'
import Form from '@/pages/faculty/registrationforms/form.js'

export default async function Home(props) {
    const searchParams = await props.searchParams,
        data = await view_profile(searchParams.reg_no),
        picture = await getProfilePicture(searchParams.reg_no)
    return (
        <div>
            <Header
                backButton_link={
                    searchParams.archive
                        ? '/faculty-portal/archives'
                        : '/faculty-portal/registration-forms'
                }
            />
            <Form data={data[0]} profile_picture={picture} />
        </div>
    )
}
