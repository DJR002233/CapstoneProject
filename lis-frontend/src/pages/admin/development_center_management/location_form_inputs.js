'use client'
import { saveLocationInfo } from '@/app/_lib/fetch'
import { NumericUpDown, RadioButton, TextBox } from '@/app/_lib/form-html'
import { useState } from 'react'
import { refreshLocationsTable } from './admin_location_table'

export default function Location_form_inputs() {
    const [errorMessage, seterrorMessage] = useState({
        className: '',
        innerText: '',
    })
    return (
        <div
            className="mb-10 mt-5 flex w-full flex-col gap-y-3 lg:w-1/2"
            id="left"
        >
            <div className="mx-auto w-fit">
                <label className="text-nowrap">
                    Location number:
                    <TextBox
                        id="location_number"
                        className="ms-2 rounded-md border border-neutral-300 bg-slate-100 px-1"
                        readOnly={true}
                    />
                </label>
            </div>
            <div className="mx-auto w-fit">
                <label className="text-nowrap">
                    Location name:
                    <TextBox
                        id="location_name"
                        className="ms-2 rounded-md border border-black px-1"
                    />
                </label>
            </div>
            <div className="mx-auto w-fit">
                <label className="text-nowrap">
                    Location address:
                    <TextBox
                        id="location_address"
                        className="ms-2 rounded-md border border-black px-1"
                    />
                </label>
            </div>
            <div className="mx-auto flex w-3/4 flex-wrap">
                <label className="text-nowrap">location visibility:</label>
                <label className="mx-auto">
                    <RadioButton
                        className="mx-2"
                        id="status"
                        name="status"
                        value="1"
                    />
                    Visible
                </label>
                <label className="mx-auto">
                    <RadioButton
                        className="mx-2"
                        id="status"
                        name="status"
                        value="0"
                    />
                    Invisible
                </label>
            </div>
            <div className="mx-auto w-fit">
                <label className="text-nowrap">
                    Max registrations:
                    <NumericUpDown
                        id="max_registration_forms"
                        max="9999"
                        className="ms-2 max-w-16 rounded-md border border-black ps-1"
                    />
                </label>
            </div>
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
            <div className="flex">
                <button
                    className="mx-auto h-10 w-1/3 border border-blue-500 bg-blue-300 px-2"
                    onClick={save}
                >
                    Save
                </button>
                <button
                    className="mx-auto h-10 w-1/3 border border-blue-500 bg-blue-300 px-2"
                    onClick={clear}
                >
                    Clear
                </button>
            </div>
            {/* <label>Allow Enrollment:</label> */}
        </div>
    )
    async function save() {
        const div = document.getElementById('left'),
            inputs = div.getElementsByTagName('input'),
            data = {}
        for (let i = 0; i < inputs.length - 3; i++) {
            const label = div.getElementsByTagName('label')[i].innerText
            if (i > 0 && !inputs[i].value) {
                alert('Please input ' + label.substring(0, label.length - 1))
                break
            }
            data[inputs[i].id] = inputs[i].value
        }
        if (inputs[3].checked) {
            data['status'] = 1
        } else if (inputs[4].checked) {
            data['status'] = 0
        } else {
            data['status'] = 0
            return false
        }
        data[inputs[5].id] = inputs[5].value
        if (!inputs[5].value) data['max_registration_forms'] = 0
        const res = await saveLocationInfo(data)
        // console.log(res)
        if (res.status == 'Error') {
            seterrorMessage({
                className:
                    'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                innerText: res.message,
            })
            return false
        } else if (res.status == 'success') {
            alert('saved successfully!')
            clear()
            refreshLocationsTable()
            return true
        }
        alert(res.status)
        seterrorMessage({
            className:
                'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
            innerText: res.message,
        })
    }
    function clear() {
        const div = document.getElementById('left'),
            inputs = div.getElementsByTagName('input')
        inputs[0].value = ''
        inputs[1].value = ''
        inputs[2].value = ''
        inputs[3].checked = false
        inputs[4].checked = false
        inputs[5].value = ''
    }
}
export function addLocationInputValues(data) {
    const div = document.getElementById('left'),
        inputs = div.getElementsByTagName('input')
    inputs[0].value = data['location_number']
    inputs[1].value = data['location_name']
    inputs[2].value = data['location_address']
    if (data['status']) {
        inputs[3].checked = true
    } else {
        inputs[4].checked = true
    }
    inputs[5].value = data['max_registration_forms']
}
