'use client'
import {
    get_evaluations,
    get_sessions,
    getSession_Evaluation,
    session,
} from '@/app/_lib/fetch'
import {
    table,
    addTableHeader,
    setDataSet,
    setTableView,
    tableConfig,
    extend_event,
} from '@/app/_lib/simpletableview'
import { useEffect, useState } from 'react'
import { addScores } from '@/pages/faculty/gradesandmappingvisualization/scores'

let session_list = [],
    evaluation_scores = null

export default function Grades({ available_locations = [] }) {
    const [total, settotal] = useState(0)
    const [male, setmale] = useState(0)
    const [female, setfemale] = useState(0)
    const [errorMessage, seterrorMessage] = useState({
        className: '',
        innerText: '',
    })
    const location_options = []
    for (let i = 0; i < available_locations.length; i++) {
        const loc = available_locations[i]
        location_options.push(
            <option
                key={loc.location_number}
                id={loc.location_name}
                value={loc.location_number}
            >
                {loc.location_name + ' | '}
                {loc.current_registrations + '/' + loc.max_registration_forms}
            </option>
        )
    }
    useEffect(() => {
        load_table()
        // const session_value = getCookie('session_value')
        // if (session_value && session_value != 0) {
        //     getSessionData(session_value)
        //     getEvaluationFormsData(session_value)
        //     document.getElementById('dropdownBox').value = session_value
        // }
    }, [])
    return (
        <>
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
            <div className="mt-3 flex items-end">
                <select
                    id="comboBox"
                    className="h-8 border-x-2 border-t-2 border-black"
                    onChange={selectLocation}
                >
                    <option hidden>-- select location --</option>
                    {location_options}
                </select>
                <select
                    id="dropdownBox"
                    className="h-8 border-x-2 border-t-2 border-black"
                    onChange={viewSession}
                >
                    <option hidden>-- select session --</option>
                    <option id="session_1" value="1">
                        Session 1
                    </option>
                    <option id="session_2" value="2">
                        Session 2
                    </option>
                    <option id="session_3" value="3">
                        Session 3
                    </option>
                    <option id="session_4" value="4">
                        Session 4
                    </option>
                    <option id="session_5" value="5">
                        Session 5
                    </option>
                </select>
                <div className="ms-auto flex w-fit flex-wrap items-center pb-1">
                    <p className="me-10" id="total">
                        Number of Children: {total}
                    </p>
                    <p className="me-10" id="males">
                        Males: {male}
                    </p>
                    <p className="me-10" id="females">
                        Females: {female}
                    </p>
                </div>
            </div>
        </>
    )
    async function selectLocation() {
        document.cookie =
            'session_value=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        document.getElementById('dropdownBox').value = '-- select session --'
    }
    async function viewSession() {
        seterrorMessage({
            className: '',
            innerText: '',
        })
        const location_value = document.getElementById('comboBox').value,
            session_value = document.getElementById('dropdownBox').value
        if (Number.isNaN(parseInt(location_value))) {
            alert('Please select location first')
            document.getElementById('dropdownBox').value =
                '-- select session --'
            return false
        }
        processChildInformation(location_value, session_value)
        evaluation_scores = await get_evaluations(location_value, session_value)
        {
            const now = new Date(),
                time = now.getTime(),
                expireTime = time + 1000 * 60 * 240
            now.setTime(expireTime)
            document.cookie =
                'session_value=' +
                session_value +
                ';expires=' +
                now.toUTCString() +
                ';Path=/'
        }
    }
    async function processChildInformation(location_value, session_value) {
        const list = await get_sessions(location_value, session_value),
            objectOrder = {
                'No.': null,
            }
        console.log(list)
        if (!list) {
            setDataSet('child_information_table', [])
            setTableView('child_information_table', {
                value: 'registration_number',
                exclude: true,
            })
            return true
        }
        if (!list[0]) {
            setDataSet('child_information_table', [])
            setTableView('child_information_table', {
                value: 'registration_number',
                exclude: true,
            })
            return true
        }
        const entries = { total: list.length, male: 0, female: 0 }
        session_list.length = 0
        for (let i = 0; i < list.length; i++) {
            if (list[i].gender == 'male') {
                entries['male']++
            } else entries['female']++
            list[i]['No.'] = i + 1
            const created_at = new Date(list[i]['created_at']),
                date_of_birth = new Date(list[i]['date_of_birth'])
            list[i]['Age_in_months'] = diff_months(created_at, date_of_birth)
            delete list[i].created_at
            list[i] = Object.assign(structuredClone(objectOrder), list[i])
        }
        setDataSet('child_information_table', list)
        setTableView('child_information_table', {
            value: 'registration_number',
            exclude: true,
        })
        session_list['child_information'] = list
        settotal(entries.total)
        setmale(entries.male)
        setfemale(entries.female)
    }
}
function load_table() {
    addTableHeader('child_information_table', [
        {
            'No.': {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            GENDER: {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            SURNAME: {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            'FIRST NAME': {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            'MIDDLE NAME': {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            'DATE OF BIRTH': {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            'AGE IN MOS.': {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
        },
    ])
    tableConfig['child_information_table'].no_data_default_value = '.'
    tableConfig['child_information_table'].row_selection_mode = true
    tableConfig['child_information_table'].selected_row_design = 'bg-red-200'
    tableConfig['child_information_table'].selected_cell_design =
        'border-2 border-gray-500 h-8 cursor-default'
    setTableView('child_information_table', {
        value: 'registration_number',
        exclude: true,
    })
    extend_event['child_information_table'].tbody_onClick = function (e) {
        if (!e) return false
        const cell = e.target
        if (!cell) return false
        const row = cell.parentNode
        if (!row) return false
        const rowIndex = row.rowIndex
        if (!rowIndex) return false
        addScores(evaluation_scores, rowIndex - 1)
    }
}
function diff_months(dt2, dt1) {
    // Calculate the difference in milliseconds between the two dates.
    var diff = (dt2.getTime() - dt1.getTime()) / 1000
    // Convert the difference from milliseconds to months by dividing it by the number of milliseconds in an hour, a day, a week, and approximately 4 weeks in a month.
    diff /= 60 * 60 * 24 * 7 * 4
    // Round the result to the nearest integer using Math.round().
    return Math.abs(Math.round(diff))
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
