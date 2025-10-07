'use client'
import { saveStaffInfo } from '@/app/_lib/fetch'
import { CheckBox, RadioButton, TextBox } from '@/app/_lib/form-html'
import { refreshTable } from './search_table_select'
import { useState } from 'react'

export default function InputFields({ locations = [] }) {
    const [errorMessage, seterrorMessage] = useState({
        className: '',
        innerText: '',
    })
    const locationOptions = []
    for (let i = 0; i < locations.length; i++) {
        const availability = locations[i]['status'] ? 'Active' : 'Inactive'
        locationOptions.push(
            <option
                key={locations[i]['location_number']}
                id={locations[i]['location_name']}
                value={locations[i]['location_number']}
            >
                {locations[i]['location_name'] + ' | ' + availability}
            </option>
        )
    }
    return (
        <div className="mb-10 xl:w-1/2" id="left">
            <div id="div_1" className="mb-4">
                <label className="text-nowrap">
                    Staff ID:
                    <TextBox
                        className="ms-2 rounded-md border border-neutral-300 bg-slate-100"
                        id="staff_id"
                        readOnly={true}
                    />
                </label>
                <div className="mt-4 flex basis-full flex-wrap xl:ps-6">
                    <label className="mx-auto mt-2 text-nowrap">
                        Username:
                        <TextBox
                            className="ms-2 rounded-md border border-black px-1 shadow-black drop-shadow-md"
                            id="username"
                            placeholder="username"
                        />
                    </label>
                    <label className="mx-auto mt-2 text-nowrap">
                        Password:
                        <TextBox
                            className="ms-2 rounded-md border border-black px-1 shadow-black drop-shadow-md"
                            id="password"
                            placeholder="password"
                        />
                    </label>
                </div>
            </div>

            <div
                id="div_2"
                className="mx-auto my-8 flex flex-wrap gap-x-5 xl:ps-6"
            >
                <label className="mx-auto mt-2 text-nowrap">
                    First Name:
                    <TextBox
                        className="ms-2 rounded-md border border-black px-1 shadow-black drop-shadow-md"
                        id="first_name"
                        placeholder="first name"
                    />
                </label>
                <label className="mx-auto mt-2 text-nowrap">
                    Middle Name:
                    <TextBox
                        className="ms-2 rounded-md border border-black px-1 shadow-black drop-shadow-md"
                        id="middle_name"
                        placeholder="middle name"
                    />
                </label>
                <div className="basis-full" />
                <label className="mx-auto mt-2 text-nowrap">
                    Last Name:
                    <TextBox
                        className="ms-2 rounded-md border border-black px-1 shadow-black drop-shadow-md"
                        id="last_name"
                        placeholder="last name"
                    />
                </label>
                <label className="mx-auto mt-2 text-nowrap">
                    <span className="ms-14">Suffix:</span>
                    <TextBox
                        className="ms-2 rounded-md border border-black px-1 shadow-black drop-shadow-md"
                        id="suffix"
                        placeholder="suffix"
                    />
                </label>
            </div>

            <div id="div_3" className="mx-auto w-fit md:my-12">
                <label className="text-nowrap">
                    Assigned Location:
                    <select
                        id="dropdownBox"
                        className="ms-2 h-8 rounded-md border border-black px-2 shadow-black drop-shadow-sm"
                    >
                        <option hidden>-- select location --</option>
                        {locationOptions}
                    </select>
                </label>
            </div>

            <div
                id="div_4"
                className="mx-auto my-8 flex flex-wrap lg:w-2/3 xl:w-4/5"
            >
                <label className="me-2 text-nowrap">Authorization:</label>
                <label className="mx-auto text-nowrap">
                    <RadioButton
                        className="me-2"
                        name="authorization_level"
                        value="0"
                    />
                    No Access
                </label>
                <label className="mx-auto text-nowrap">
                    <RadioButton
                        className="me-2"
                        name="authorization_level"
                        value="1"
                    />
                    Teacher
                </label>
                <label className="mx-auto text-nowrap">
                    <RadioButton
                        className="me-2"
                        name="authorization_level"
                        value="2"
                    />
                    Officer
                </label>
                <label className="mx-auto text-nowrap">
                    <RadioButton
                        className="me-2"
                        name="authorization_level"
                        value="3"
                    />
                    Admin
                </label>
            </div>

            <div id="div_5" className="mx-auto my-4 flex w-11/12 flex-wrap">
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                    <label className="me-2">
                        Submitted Evaluation Form For:
                    </label>
                    <label className="mx-auto">
                        <CheckBox
                            id="session_1"
                            className="me-2 text-nowrap"
                            value="1"
                        />
                        Session 1
                    </label>
                    <label className="mx-auto">
                        <CheckBox
                            id="session_2"
                            className="me-2 text-nowrap"
                            value="2"
                        />
                        Session 2
                    </label>
                    <label className="mx-auto">
                        <CheckBox
                            id="session_3"
                            className="me-2 text-nowrap"
                            value="3"
                        />
                        Session 3
                    </label>
                    <label className="mx-auto">
                        <CheckBox
                            id="session_4"
                            className="me-2 text-nowrap"
                            value="4"
                        />
                        Session 4
                    </label>
                    <label className="mx-auto">
                        <CheckBox
                            id="session_5"
                            className="me-2 text-nowrap"
                            value="5"
                        />
                        Session 5
                    </label>
                </div>
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

            <div
                id="buttons"
                className="mx-auto mt-8 flex w-3/4 flex-wrap gap-x-5"
            >
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
        </div>
    )
    async function save() {
        seterrorMessage({
            className: '',
            innerText: '',
        })
        const div = document.getElementById('left'),
            input = div.getElementsByTagName('input'),
            ddb = document.getElementById('dropdownBox'),
            data = {},
            arr = []
        for (let i = 0; i < input.length - 13; i++) {
            if (!input[0].value && !input[i].value && i != 0) {
                const label = div.getElementsByTagName('label')[i].innerText
                alert(label.substring(0, label.length - 1) + ' is Required')
                return false
            }
            data[input[i].id] = input[i].value
        }
        for (let i = 3; i < input.length - 9; i++) {
            if (!input[i].value && i != 6 && i != 4) {
                const label = div.getElementsByTagName('label')[i].innerText
                alert(label.substring(0, label.length - 1) + ' is Required')
                return false
            }
            data[input[i].id] = input[i].value
        }
        if (ddb.selectedIndex <= 0) {
            alert('Assigned Location is Required')
            return false
        }
        data['location_post'] = ddb.value
        for (let i = 7; i < input.length - 5; i++) {
            if (input[i].checked) data['authorization_level'] = input[i].value
        }
        if (!data['authorization_level']) data['authorization_level'] = 0
        for (let i = 11; i < input.length; i++) {
            if (input[i].checked) arr.push(input[i].value)
        }
        data['finished_grading'] = JSON.stringify(arr)
        const res = await saveStaffInfo(data)
        // console.log(res)
        if (res.status == 'Error') {
            seterrorMessage({
                className:
                    'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                innerText: res.message,
            })
            return false
        } else if (res.status == 'success') {
            alert(res.message)
            refreshTable()
            clear()
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
            inputs = div.getElementsByTagName('input'),
            ddb = document.getElementById('dropdownBox')
        for (let i = 0; i < inputs.length - 9; i++) {
            inputs[i].value = ''
        }
        ddb.value = '-- select location --'
        for (let i = 7; i < inputs.length - 5; i++) {
            if (inputs[i].checked) {
                inputs[i].checked = false
                break
            }
        }
        for (let i = 11; i < inputs.length; i++) {
            if (inputs[i].checked) inputs[i].checked = false
        }
    }
}
export function addvalues(data) {
    const div = document.getElementById('left'),
        inputs = div.getElementsByTagName('input')
    inputs[0].value = data['staff_id']
    inputs[3].value = data['first_name']
    inputs[4].value = data['middle_name']
    inputs[5].value = data['last_name']
    inputs[6].value = data['suffix']
    document.getElementById('dropdownBox').value = data['location_post']
    for (let i = 0; i < 4; i++) {
        const start = i + 7
        if (inputs[start].value == data['authorization_level']) {
            inputs[start].checked = true
            break
        }
    }
    const arr = JSON.parse(data['finished_grading'])
    for (let i = 0; i < 5; i++) {
        const start = i + 11
        inputs[start].checked = false
        if (arr.indexOf(inputs[start].value) >= 0) inputs[start].checked = true
    }
}
