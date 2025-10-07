import { NextResponse } from 'next/server'
import {
    authorization_level_check,
    LocationandSchoolYear,
} from './app/_lib/fetch'
import { getLocationCookies } from './app/_lib/cookies'
// import DELETE from './app/log-out/page'
//import { cookies } from 'next/headers'

export async function middleware(request) {
    const token = request.cookies.has('token'),
        req_authorization =
            request.nextUrl.pathname.startsWith('/login-portal') ||
            request.nextUrl.pathname.startsWith('/inactive') ||
            request.nextUrl.pathname.startsWith('/faculty-portal') ||
            request.nextUrl.pathname.startsWith('/center') ||
            request.nextUrl.pathname.startsWith('/admin') ||
            request.nextUrl.pathname.startsWith('/unauthenticated')
    if (req_authorization) {
        const credentials = await authorization_level_check()
        if (!token && !request.nextUrl.pathname.startsWith('/login-portal')) {
            return NextResponse.redirect(new URL('/login-portal', request.url))
        } else if (
            !request.nextUrl.pathname.startsWith('/inactive') &&
            credentials.level == 0
        ) {
            return NextResponse.redirect(new URL('/inactive', request.url))
        } else if (
            !request.nextUrl.pathname.startsWith('/faculty-portal') &&
            credentials.level == 1
        ) {
            return NextResponse.redirect(
                new URL('/faculty-portal/dashboard', request.url)
            )
        } else if (
            !request.nextUrl.pathname.startsWith('/center') &&
            credentials.level == 2
        ) {
            console.log('why')
            return NextResponse.redirect(new URL('/center', request.url))
        } else if (
            !request.nextUrl.pathname.startsWith('/admin') &&
            credentials.level == 3
        ) {
            return NextResponse.redirect(new URL('/admin', request.url))
        } else if (
            !token &&
            request.nextUrl.pathname.startsWith('/unauthenticated')
        ) {
            return NextResponse.redirect(new URL('/faculty-login', request.url))
        } else if (
            token &&
            credentials.message == 'Unauthenticated.' &&
            !request.nextUrl.pathname.startsWith('/unauthenticated')
        ) {
            const res = NextResponse.redirect(
                new URL('/unauthenticated', request.url)
            )
            return res
        }
    }

    if (!token && request.nextUrl.pathname.startsWith('/faculty_portal')) {
        return NextResponse.redirect(new URL('/faculty-login', request.url))
    } else if (
        token &&
        request.nextUrl.pathname.startsWith('/faculty_portal')
    ) {
        const response = NextResponse.redirect(
                new URL('/faculty-portal', request.url)
            ),
            segment = request.nextUrl.pathname.split('/')
        let location = await LocationandSchoolYear(await getLocationCookies())
        location = location.location
        // response.cookies.set('bool', )
        // console.log(segment)
        if (segment[2] == 'download') {
            if (segment[3] == 'masterlist') {
                if (segment[4] != location) return response
            }
            if (segment[3] == 'grading_sheet') {
                if (segment[4] != location) return response
            }
        } else {
            return response
        }
    }

    /*
    if (token && request.nextUrl.pathname.startsWith('/log-out')) {
        const response = NextResponse.redirect(new URL('/log-out', request.url))
        await faculty_logout()
        response.cookies.delete('token')
        response.cookies.delete('registration_forms_selected_row')
        response.cookies.delete('session_value')
        return response
    } /**/
}

// See "Matching Paths" below to learn more
export const config = {
    // matcher: '/about/:path*',
}
