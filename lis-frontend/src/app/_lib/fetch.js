'use server'
import {
    setTokenCookies,
    getTokenCookies,
    deleteTokenCookies,
    getLocationCookies,
} from './cookies'

const protocol = 'http://',
    host = 'localhost',
    port = ':8000',
    url = protocol + host + port

export async function available_locations() {
    try {
        const res = await fetch(url + `/api/available_development_centers`, {
            cache: 'no-store',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function verify_registration_form(id, name) {
    try {
        const res = await fetch(url + `/api/verify_registration_form`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    id: id,
                    name: name,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function sendRegistration_formdata(body) {
    try {
        const res = await fetch(url + `/api/register`, {
            method: 'POST',
            body: body,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 3600, //1hr = 3600 | 24hrs = 86400
            },
        })
        if (!res.ok) {
            return false
        }
        return true
    } catch (err) {
        return false
    }
}

export async function faculty_login(body) {
    try {
        const res = await fetch(url + `/api/login`, {
            method: 'POST',
            body: body,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Max-Age': 300,
            },
        })
        const data = await res.json()
        if (data.errors) {
            return data
        } else if (!data.token) {
            return data
        } else if (data.token) {
            // await setTokenCookies(data.token)
            return { status: data.status, token: data.token }
        }
        return { status: 'error' }
    } catch (err) {
        return err
    }
}
export async function admin_login(body) {
    try {
        const res = await fetch(url + `/api/admin_login`, {
            method: 'POST',
            body: body,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Max-Age': 300,
            },
        })
        const data = await res.json()
        if (data.errors) {
            return data
        } else if (!data.token) {
            return data
        } else if (data.token) {
            // await setTokenCookies(data.token)
            return { status: data.status, token: data.token }
        }
        return { status: 'error' }
    } catch (err) {
        return err
    }
}
export async function changeCredentials(body) {
    try {
        const res = await fetch(url + `/api/change_credentials`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Max-Age': 300,
            },
        })
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}
export async function faculty_logout() {
    try {
        const res = await fetch(url + `/api/logout`, {
            method: 'POST',
            body: JSON.stringify({ token: await getTokenCookies() }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Max-Age': 300,
            },
        })
        const data = await res.json()
        await deleteTokenCookies()
        return data
    } catch (err) {
        return err
    }
}

export async function authorization_level_check() {
    try {
        const res = await fetch(url + `/api/authorization_level`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function get_active_location_list() {
    try {
        const res = await fetch(url + `/api/active_locations`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function get_sessions(location_number, session_number) {
    try {
        const res = await fetch(url + `/api/get_sessions`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    location_number: location_number,
                    session_number: session_number,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}
export async function get_evaluations(location_number, session_number) {
    try {
        const res = await fetch(url + `/api/evaluation_data`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    location_number: location_number,
                    session_number: session_number,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function LocationandSchoolYear(location) {
    try {
        const res = await fetch(url + `/api/location_sy`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}
export async function AllLocationandSchoolYear() {
    try {
        const res = await fetch(url + `/api/all_location_sy`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}
export async function dashboard_data(location) {
    try {
        const res = await fetch(url + `/api/dashboard`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function registration_forms(location) {
    try {
        const res = await fetch(url + `/api/reg_forms`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function enrolled_forms(location) {
    try {
        const res = await fetch(url + `/api/enrolled_forms`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function excluded_forms(location) {
    try {
        const res = await fetch(url + `/api/excluded_forms`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function view_profile(id, location) {
    try {
        const res = await fetch(url + `/api/view_profile`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    id: id,
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function getProfilePicture(id, location) {
    try {
        const res = await fetch(url + `/api/get_profile_picture`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    id: id,
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        const data = await res.json()
        const http = await fetch(data, {
            method: 'HEAD',
        })
        if (http.status == 404) {
            return null
        }
        return data
    } catch (err) {
        return err
    }
}

export async function exclude_form(id, exclude) {
    try {
        const res = await fetch(url + `/api/exclude_form`, {
            method: 'POST',
            body: JSON.stringify({
                registration_number: id,
                exclude_value: exclude,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function change_session(id, session_number, location) {
    try {
        const res = await fetch(url + `/api/change_session`, {
            method: 'POST',
            body: JSON.stringify({
                registration_number: id,
                session_value: session_number,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function enroll_form(id) {
    try {
        const res = await fetch(url + `/api/enroll_form`, {
            method: 'POST',
            body: JSON.stringify({ registration_number: id }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function session(num, location) {
    try {
        const res = await fetch(url + `/api/session`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    session: num,
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function getSession_Evaluation(num, location) {
    try {
        const res = await fetch(url + `/api/getSessionEvaluation`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    session_value: num,
                    location: await getLocationCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function uploadSession_Grades(num, body, location) {
    try {
        const res = await fetch(url + `/api/uploadSessionGrades`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    session_value: num,
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function getSchoolYears() {
    try {
        const res = await fetch(url + `/api/school_years`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    location: await getLocationCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function getArchivesData(year) {
    try {
        const res = await fetch(url + `/api/get_archives_data`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    school_year: year,
                    location: await getLocationCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function getArchivedGrade(reg_no, location) {
    try {
        const res = await fetch(url + `/api/get_grade`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                    registration_number: reg_no,
                    location: location,
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function saveStaffInfo(body) {
    try {
        const res = await fetch(url + `/api/save_staff_info`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}
export async function saveLocationInfo(body) {
    try {
        const res = await fetch(url + `/api/save_location_info`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function getAllLocations() {
    try {
        const res = await fetch(url + `/api/get_all_locations`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}
export async function getStaffInformation() {
    try {
        const res = await fetch(url + `/api/get_staff_information`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify({
                    token: await getTokenCookies(),
                }),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}

export async function getChildData(body) {
    try {
        const res = await fetch(url + `/api/get_child_data`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: JSON.stringify(body),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': 300,
            },
        })
        if (!res.ok) {
            return { status: 'Error', res: await res.json() }
        }
        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}
/* fetch metadata
cache: 'force-cache',
next: { revalidate: 10 }, //default value: 3600

credentials: 'include', //'include', or 'same-origin'
method: 'POST',
body: body,
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
'X-XSRF-TOKEN': getTokenCookies(),
'Access-Control-Allow-Headers': '*',
'Access-Control-Allow-Origin': '*', //'*, <origin>, null'
'Access-Control-Allow-Methods': 'POST',
//'POST, GET, OPTIONS, DELETE'
'Access-Control-Allow-Credentials': 'true',
'Access-Control-Max-Age': 3600, //1hr = 3600 | 24hrs = 86400
},
*/
