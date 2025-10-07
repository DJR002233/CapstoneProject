'use server'
import { cookies } from 'next/headers'
export async function setTokenCookies(token) {
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
        secure: true,
        httpOnly: true,
        maxAge: 25200,
    })
    return true
}

export async function getLocationCookies() {
    const cookieStore = await cookies(),
        token = cookieStore.get('selected_location')?.value
    return token
}

export async function getTokenCookies() {
    const cookieStore = await cookies(),
        token = cookieStore.get('token')?.value
    return token
}

export async function deleteTokenCookies() {
    ;(await cookies()).delete('token')
    return true
}

export async function getGradeCookies() {
    const cookieStore = await cookies(),
        grades = cookieStore.get('data')?.value
    return grades
}
