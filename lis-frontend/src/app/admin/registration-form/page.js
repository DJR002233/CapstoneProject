import { getProfilePicture, view_profile } from '@/app/_lib/fetch'
import Header from '@/pages/admin/registrationforms/header'
import Form from '@/pages/faculty/registrationforms/form.js'
import { getLocationCookies } from '@/app/_lib/cookies'

export default async function Home(props) {
    const searchParams = await props.searchParams,
        data = await view_profile(
            searchParams.reg_no,
            await getLocationCookies()
        ),
        picture = await getProfilePicture(
            searchParams.reg_no,
            await getLocationCookies()
        )
    return (
        <div>
            <Header
                backButton_link={
                    searchParams.archive
                        ? '/admin/archives'
                        : '/admin/registration-forms'
                }
            />
            <Form
                data={data[0]}
                profile_picture={picture}
                redirect_link="/admin"
            />
        </div>
    )
}
