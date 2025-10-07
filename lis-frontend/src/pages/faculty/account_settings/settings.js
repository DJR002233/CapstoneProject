'use client'

import { changeCredentials } from '@/app/_lib/fetch'
import { TextBox } from '@/app/_lib/form-html'
import { hide } from '@/components/WideStatusText'
import { useEffect, useState } from 'react'

export default function Settings() {
    const [errorMessage, seterrorMessage] = useState({
        className: '',
        innerText: '',
    })
    useEffect(() => {
        hide()
    }, [])
    return (
        <div
            className="flex flex-col items-center gap-y-5 pt-5"
            id="settings_div"
        >
            <p className="text-xl font-bold">
                Change Username or Password Settings
            </p>

            <label className="mt-5">
                Current Username:{' '}
                <TextBox
                    className="rounded-lg border border-black px-2"
                    id="current_username"
                    placeholder={'Enter current username'}
                />
            </label>
            <label>
                Current Password:{' '}
                <TextBox
                    type="password"
                    className="rounded-lg border border-black px-2"
                    id="current_password"
                    placeholder={'Enter current password'}
                />
            </label>

            <label className="mt-10">
                New Username:{' '}
                <TextBox
                    className="rounded-lg border border-black px-2"
                    id="new_username"
                    placeholder={'Enter new username'}
                />
            </label>
            <label>
                New Password:{' '}
                <TextBox
                    type="password"
                    className="rounded-lg border border-black px-2"
                    id="new_password"
                    placeholder={'Enter new password'}
                />
            </label>

            <div
                className={errorMessage.className}
                onClick={function (e) {
                    seterrorMessage({
                        className: '',
                        innerText: '',
                    })
                }}
            >
                <p className="mx-auto">{errorMessage.innerText}</p>
            </div>
            <div className="mt-5 flex gap-x-28">
                <button
                    className="rounded-lg border border-black bg-blue-300 px-6 py-2"
                    type="button"
                    onClick={changeAccountCredentials}
                >
                    Save
                </button>
                <button
                    className="rounded-lg border border-black bg-blue-300 px-6 py-2"
                    type="button"
                    onClick={clear}
                >
                    Clear
                </button>
            </div>
        </div>
    )
    async function changeAccountCredentials() {
        const div = document.getElementById('settings_div'),
            textboxes = div.getElementsByTagName('input'),
            payload = {}
        for (let i = 0; i < textboxes.length; i++) {
            if (!textboxes[i].value && i < 2) {
                seterrorMessage({
                    className:
                        'mx-auto px-2 mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                    innerText: 'Please enter your ' + textboxes[i].id,
                })
                return false
            }
            payload[textboxes[i].id] = textboxes[i].value
        }
        if (payload.new_username || payload.new_password) {
            const res = await changeCredentials(payload)
            console.log(res)
            if (res.status == 'success') {
                alert('Changed Successfully!')
                clear()
                return true
            }
            seterrorMessage({
                className:
                    'mx-auto px-2 mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                innerText: res.message,
            })
            return false
        }
        seterrorMessage({
            className:
                'mx-auto px-2 mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
            innerText: 'Please enter a new username or password!',
        })
    }
    function clear() {
        const div = document.getElementById('settings_div'),
            textboxes = div.getElementsByTagName('input')
        for (let i = 0; i < textboxes.length; i++) textboxes[i].value = ''
    }
}
