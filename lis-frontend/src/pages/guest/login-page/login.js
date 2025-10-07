'use client'
import { admin_login, faculty_login } from '@/app/_lib/fetch'
import { TextBox } from '@/app/_lib/form-html'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const className = { section1: 'mt-10 mx-auto', section2: 'mt-5 mb-10 mx-auto' }

export default function Loginpage({ user = 0 }) {
    const [alert, setAlert] = useState({
        hidden: 'hidden',
        color: '',
        text: '',
    })
    const [buttonState, setbuttonState] = useState({
        disabled: false,
        opacity: '',
        text: 'Login',
    })
    const router = useRouter(),
        u = ['Faculty', 'Admin'],
        l = user ? 0 : 1

    return (
        <div
            onSubmit={onSubmit}
            className="mb-10 flex flex-col text-black sm:mx-5 md:mx-12 xl:mx-14 2xl:mx-20"
        >
            <div className="mx-auto my-5 flex items-center">
                <Image
                    src="/logo.jpg"
                    width={75}
                    height={75}
                    alt="Picture of the author"
                />
                <h3 className="max-w-30 ms-2 mt-2 flex text-xl text-black">
                    Putatan Child Development Center
                </h3>
            </div>
            <div className="mx-auto w-fit bg-gray-200 px-36 pb-10 pt-5 shadow-md">
                <h2 className="my-5 text-center text-2xl">{u[user]} Portal</h2>
                <form className="flex w-full flex-col">
                    <section className={className.section1}>
                        <label className="pe-5" htmlFor="username">
                            Username:{' '}
                        </label>
                        <TextBox
                            className="border-2"
                            id="username"
                            name="username"
                            placeholder="username"
                        />
                    </section>
                    <section className={className.section2}>
                        <label className="pe-5" htmlFor="password">
                            Password:{' '}
                        </label>
                        <TextBox
                            className="border-2 ps-1"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </section>

                    <pre
                        className={
                            'mx-auto border-4 px-10 py-2 text-center' +
                            ' ' +
                            alert.color +
                            ' ' +
                            alert.hidden
                        }
                    >
                        <p>{alert.text}</p>
                    </pre>
                    <button
                        type="submit"
                        disabled={buttonState.disabled}
                        className={
                            'mx-auto my-5 mt-5 w-fit rounded-md border-4 border-blue-600 bg-blue-600 px-2 py-2 text-white' +
                            ' ' +
                            buttonState.opacity
                        }
                    >
                        {buttonState.text}
                    </button>
                </form>
            </div>
            <Link href={'/login-portal?u=' + l}>
                <p className="mt-10 text-center text-indigo-700">
                    Login as {u[l]}
                </p>
            </Link>
        </div>
    )

    async function onSubmit(evt) {
        evt.preventDefault()
        setbuttonState({
            disabled: true,
            opacity: 'opacity-50',
            text: 'loading...',
        })
        setAlert({ hidden: 'hidden', color: '', text: '' })
        const username = document.getElementById('username').value,
            password = document.getElementById('password').value,
            data = JSON.stringify({
                username: username,
                password: password,
            })
        let res = null
        if (user == 1) {
            res = await admin_login(data)
            // console.log('admin')
        } else {
            res = await faculty_login(data)
            // console.log('staff')
        }
        // console.log(res)
        if (res.errors) {
            setAlert({
                hidden: '',
                color: 'border-red-400 bg-red-300',
                text: res.message,
            })
        } else if (res.status == 'failed') {
            setAlert({
                hidden: '',
                color: 'border-red-400 bg-red-300',
                text: res.message,
            })
        } else {
            setAlert({
                hidden: '',
                color: 'border-red-400 bg-red-300',
                text: res.status,
            })
        }
        setbuttonState({
            disabled: false,
            opacity: '',
            text: 'Login',
        })
        if (res.status == 'success') {
            const now = new Date(),
                time = now.getTime(),
                expireTime = time + 1000 * 60 * 240
            now.setTime(expireTime)
            // if (!getCookie('token'))
            document.cookie =
                'token=' +
                res.token +
                ';expires=' +
                now.toUTCString() +
                ';Path=/'
            setAlert({
                hidden: '',
                color: 'border-green-400 bg-green-300',
                text: res.status,
            })
            setbuttonState({
                disabled: true,
                opacity: 'opacity-50',
                text: 'redirecting, Loading...',
            })
            router.replace('/faculty-portal/dashboard', { shallow: true })
        }
    }
}
function getCookie(cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}
