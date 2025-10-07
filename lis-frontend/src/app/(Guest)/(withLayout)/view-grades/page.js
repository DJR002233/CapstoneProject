'use client'
import { getChildData } from '@/app/_lib/fetch'
import { DateTimePicker, TextBox } from '@/app/_lib/form-html'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ChildCode() {
    const router = useRouter()
    const [errorMessage, seterrorMessage] = useState({
        className: '',
        innerText: '',
    })
    return (
        <div
            className="mx-10 mb-10 mt-8 flex flex-col gap-y-3 text-black md:mx-20 lg:mx-32 lg:mt-10"
            id="main"
        >
            <p className="mb-3 text-center text-lg font-bold">
                Enter the required information:
            </p>
            <label className="mx-auto">
                Enter First Name:
                <TextBox
                    className="ms-2 rounded-md border border-black px-1"
                    id="first_name"
                />
            </label>
            <label className="mx-auto">
                Enter Middle Name:
                <TextBox
                    className="ms-2 rounded-md border border-black px-1"
                    id="middle_name"
                />
            </label>
            <label className="mx-auto">
                Enter Last Name:
                <TextBox
                    className="ms-2 rounded-md border border-black px-1"
                    id="last_name"
                />
            </label>
            <label className="mx-auto">
                Enter Suffix:
                <TextBox
                    className="ms-2 rounded-md border border-black px-1"
                    id="suffix"
                />
            </label>
            <label className="mx-auto">
                Enter Date of Birth:
                <DateTimePicker
                    className="ms-2 rounded-md border border-black ps-1"
                    id="date_of_birth"
                />
            </label>
            <label className="mx-auto my-9">
                Enter Child Code:
                <TextBox
                    className="ms-2 rounded-md border border-black px-1"
                    id="code"
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
            <button
                className="mx-auto w-56 rounded-md border border-blue-500 bg-blue-300 px-2 py-1"
                type="button"
                onClick={checkCode}
            >
                Submit
            </button>
        </div>
    )
    async function checkCode() {
        seterrorMessage({
            className: '',
            innerText: '',
        })
        const div = document.getElementById('main'),
            inputs = div.getElementsByTagName('input'),
            data = {}

        for (let i = 0; i < inputs.length; i++) {
            data[inputs[i].id] = inputs[i].value
        }
        const grades = await getChildData(data)
        if (typeof grades == 'object')
            if (grades.length > 0) {
                const now = new Date(),
                    time = now.getTime(),
                    expireTime = time + 1000 * 300
                now.setTime(expireTime)
                // console.log(now)
                document.cookie =
                    'data=' +
                    JSON.stringify(grades) +
                    ';expires=' +
                    now.toUTCString() +
                    ';Path=/'
                router.push('/grades', 'replace')
                return true
            } else {
                seterrorMessage({
                    className:
                        'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                    innerText: 'Child does not have evaluation grade',
                })
            }
        seterrorMessage({
            className:
                'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
            innerText: 'Wrong information or child code',
        })
    }
}
