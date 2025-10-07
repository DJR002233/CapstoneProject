'use client'
import { TextBox } from '@/app/_lib/form-html'
import { change_session, exclude_form, session } from '@/app/_lib/fetch'
import {
    table,
    addTableHeader,
    setDataSet,
    setTableView,
    tableConfig,
    filterDataSet,
    extend_event,
} from '@/app/_lib/simpletableview'
import { useEffect, useState } from 'react'
import { done, hide, inprogress, warning } from '@/components/WideStatusText'
import { getLocationCookies } from '@/app/_lib/cookies'

const className = {
        button: 'border mx-2 h-10 bg-blue-300 px-2 border-blue-500',
    },
    session_list = []

export default function Sessions() {
    const [total, settotal] = useState(0)
    const [male, setmale] = useState(0)
    const [female, setfemale] = useState(0)
    useEffect(() => {
        load_Tables()
        hide()
        const session_value = getCookie('session_value')
        if (session_value) {
            getSessionData(session_value)
            document.getElementById('dropdownBox').value = session_value
        }
    }, [])
    return (
        <div className="mt-5 flex flex-col text-black">
            <select
                id="dropdownBox"
                className="h-8 border border-black ps-2"
                onChange={changeSession}
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
                <option id="no_session" value="0">
                    No Session (0)
                </option>
            </select>
            <div className="mt-3 flex w-fit flex-wrap items-center">
                <div className="me-4">
                    <p>Target Session:</p>
                    <TextBox
                        className="w-44 border-2 border-gray-400 px-2"
                        id="target_session"
                        placeholder="0-5 (0 = no session)"
                    />
                </div>
                <button
                    className={'me-5 mt-2' + ' ' + className.button}
                    onClick={moveSession_onClick}
                >
                    Move to Target Session
                </button>
                <button
                    className={'mx-auto mt-2' + ' ' + className.button}
                    onClick={exclude_onClick}
                >
                    Exclude Selected Children
                </button>
            </div>
            <div className="mt-3 flex w-fit flex-wrap">
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
    )
    async function moveSession_onClick() {
        const ci_table = table['child_information_table'],
            session_number = parseInt(
                document.getElementById('target_session').value
            )
        if (!ci_table.selected_row_id) {
            alert('please select row from table below to move session!')
            return true
        }
        if (Number.isNaN(session_number)) {
            alert('please input number in target session text box!')
            return true
        }
        if (session_number > 5 || session_number < 0) {
            alert('target session must be between 0 - 5')
            return true
        }
        if (session_number == session_list.session_value) {
            alert('target session is the same as current session')
            return true
        }
        const moved = await change_session(
            ci_table.selected_row_id,
            session_number,
            await getLocationCookies()
        )
        if (moved.status == 'Error') {
            alert(moved.message)
        } else {
            if (ci_table.selected_row_value) {
                let entry =
                    'No: ' +
                    ci_table.selected_row_value[0] +
                    '\n' +
                    'Name: ' +
                    ci_table.selected_row_value[2] +
                    ', ' +
                    ci_table.selected_row_value[3] +
                    ' '
                if (ci_table.selected_row_value[4])
                    entry +=
                        ci_table.selected_row_value[4].substring(0, 1) + '.'
                alert(
                    entry +
                        '\n\n' +
                        'has successfully been moved to session: ' +
                        session_number
                )
                const array_index = ci_table.selected_row_value[0] - 1
                session_list['child_information'].splice(array_index, 1)
                session_list['nutritional_status'].splice(array_index, 1)
                session_list['parents_information'].splice(array_index, 1)
                for (
                    let i = 0;
                    i < session_list['child_information'].length;
                    i++
                )
                    session_list['child_information'][i]['No.'] = i + 1

                setDataSet(
                    'child_information_table',
                    session_list['child_information']
                )
                setTableView('child_information_table', {
                    value: 'registration_number',
                    exclude: true,
                })
                clearRelatedTables()
            }
            ci_table.selected_row_id = null
            ci_table.selected_row_name = null
            ci_table.selected_row_value = null
        }
    }
    async function exclude_onClick() {
        const ci_table = table['child_information_table']
        if (!ci_table.selected_row_id) return true
        const moved = await exclude_form(ci_table.selected_row_id, 1)
        if (moved.status == 'Error') {
            alert('An error occured!')
        } else {
            if (ci_table.selected_row_value) {
                let entry =
                    'No: ' +
                    ci_table.selected_row_value[0] +
                    '\n' +
                    'Name: ' +
                    ci_table.selected_row_value[2] +
                    ', ' +
                    ci_table.selected_row_value[3] +
                    ' '
                if (ci_table.selected_row_value[4])
                    entry +=
                        ci_table.selected_row_value[4].substring(0, 1) + '.'
                alert(
                    entry +
                        '\n\n' +
                        'has successfully been excluded!\n(you can include back in registration forms excluded tab)'
                )
                const array_index = ci_table.selected_row_value[0] - 1
                session_list['child_information'].splice(array_index, 1)
                session_list['nutritional_status'].splice(array_index, 1)
                session_list['parents_information'].splice(array_index, 1)
                // console.log(session_list['child_information'])
                // return true
                for (
                    let i = 0;
                    i < session_list['child_information'].length;
                    i++
                )
                    session_list['child_information'][i]['No.'] = i + 1

                setDataSet(
                    'child_information_table',
                    session_list['child_information']
                )
                setTableView('child_information_table', {
                    value: 'registration_number',
                    exclude: true,
                })
                clearRelatedTables()
            }
        }
        ci_table.selected_row_id = null
        ci_table.selected_row_name = null
        ci_table.selected_row_value = null
    }
    async function changeSession() {
        clearRelatedTables()
        const session_value = document.getElementById('dropdownBox').value
        await getSessionData(session_value)
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
    async function getSessionData(session_value) {
        inprogress('getting session list...')
        const list = await session(session_value, await getLocationCookies()),
            objectOrder = {
                'No.': null,
            }
        if (!list.data) {
            setDataSet('child_information_table', [])
            setTableView('child_information_table', {
                value: 'registration_number',
                exclude: true,
            })
            warning('No Records', 1500)
            return true
        }
        if (!list.data[0]) {
            setDataSet('child_information_table', [])
            setTableView('child_information_table', {
                value: 'registration_number',
                exclude: true,
            })
            warning('No Records', 1500)
            return true
        }
        const entries = { total: list.data.length, male: 0, female: 0 }
        session_list.length = 0
        session_list['nutritional_status'] = []
        session_list['parents_information'] = []
        session_list['school_year'] = list.data[0]['school_year']
        for (let i = 0; i < list.data.length; i++) {
            if (list.data[i].gender == 'male') {
                entries['male']++
            } else entries['female']++
            session_list['nutritional_status'].push(
                list.data[i].nutritional_status
            )
            session_list['parents_information'].push(
                list.data[i].parents_information
            )
            delete list.data[i].nutritional_status
            delete list.data[i].parents_information
            delete list.data[i].school_year
            list.data[i]['No.'] = i + 1
            const created_at = new Date(list.data[i]['created_at']),
                date_of_birth = new Date(list.data[i]['date_of_birth'])
            list.data[i]['Age_in_months'] = diff_months(
                created_at,
                date_of_birth
            )
            delete list.data[i].created_at
            list.data[i] = Object.assign(
                structuredClone(objectOrder),
                list.data[i]
            )
        }
        setDataSet('child_information_table', list.data)
        setTableView('child_information_table', {
            value: 'registration_number',
            exclude: true,
        })
        session_list['child_information'] = list.data
        session_list['location_number'] = list.location_number
        session_list['location_name'] = list.location_name
        session_list['staff_name'] = list.staff_name
        session_list['session_value'] = session_value
        settotal(entries.total)
        setmale(entries.male)
        setfemale(entries.female)
        processNutritionalStatusData()
        processParentsInformationData()
        done(null, 1500)
    }
    function processNutritionalStatusData() {
        const ns_table = session_list['nutritional_status'],
            objectOrder = {
                height: null,
                height_status: null,
                weight: null,
                weight_status: null,
            }
        for (let i = 0; i < ns_table.length; i++) {
            // const upon_entry = ns_table[i].upon_entry
            // console.log(upon_entry.substring(1, upon_entry.length - 1))
            // return true
            const upon_entry = ns_table[i].upon_entry,
                hw = JSON.parse(
                    upon_entry /*.substring(1, upon_entry.length - 1)*/
                )
            ns_table[i]['height'] = hw.height
            ns_table[i]['weight'] = hw.weight
            ns_table[i]['height_status'] = null
            ns_table[i]['weight_status'] = null
            if (ns_table[i]['vit_a']) {
                ns_table[i]['vit_a'] = '🗹'
            } else {
                ns_table[i]['vit_a'] = null
            }
            if (ns_table[i]['deworming']) {
                ns_table[i]['deworming'] = '🗹'
            } else {
                ns_table[i]['deworming'] = null
            }
            if (ns_table[i]['4ps']) {
                ns_table[i]['4ps'] = '🗹'
            } else {
                ns_table[i]['4ps'] = null
            }
            if (ns_table[i]['disability']) {
                ns_table[i]['disability'] = '🗹'
            } else {
                ns_table[i]['disability'] = null
            }
            if (ns_table[i]['pwd']) {
                ns_table[i]['pwd'] = '🗹'
            } else {
                ns_table[i]['pwd'] = null
            }
            delete ns_table[i].upon_entry
            ns_table[i] = Object.assign(
                structuredClone(objectOrder),
                ns_table[i]
            )
        }
    }
    function processParentsInformationData() {
        const pi_table = session_list['parents_information'],
            objectOrder = {
                name: null,
                occupation: null,
                solo_parent: null,
                address: null,
                contact_number: null,
            }
        for (let i = 0; i < pi_table.length; i++) {
            for (let x = 0; x < pi_table[i].length; x++) {
                const t = pi_table[i][x]
                t['name'] =
                    t['relationship_to_the_child'] +
                    ': ' +
                    t['first_name'] +
                    ' ' +
                    t['last_name']
                delete t['relationship_to_the_child']
                delete t['first_name']
                delete t['last_name']
                if (t['category'].toLowerCase() == 'solo parent') {
                    t['solo_parent'] = '🗹'
                } else {
                    t['solo_parent'] = null
                }
                delete t['category']
                pi_table[i][x] = Object.assign(structuredClone(objectOrder), t)
            }
        }
    }
}
export function getSessionList() {
    return session_list
}
function load_Tables() {
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
    addTableHeader('nutritional_status_table', [
        {
            'NUTRITIONAL STATUS': {
                className:
                    'bg-color-yellow relative border-x-2 border-black border-2-before border-2-after2',
                colSpan: 10,
            },
        },
        {
            HEIGHT: {
                className:
                    'bg-color-yellow relative border-x-2 border-black border-2-before border-2-after2',
                colSpan: 2,
            },
            WEIGHT: {
                className:
                    'bg-color-yellow relative border-x-2 border-black border-2-before border-2-after2',
                colSpan: 2,
            },
            'OTHER HEALTH SERVICES': {
                className:
                    'bg-color-yellow relative border-x-2 border-black border-2-before border-2-after2',
                colSpan: 5,
            },
        },
        {
            'Height in cm': {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            STATUS: {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            'Weight in Kg': {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            'STATUS ': {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            'VIT A': {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            Deworming: {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            "4P's": {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            DISABILITY: {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
            PWDs: {
                className:
                    'relative border-x-2 border-black border-2-before border-2-after2',
            },
        },
    ])
    addTableHeader('parents_information_table', [
        {
            'PARENT / GUARDIAN': {
                className:
                    'bg-color-yellow relative border-x-2 border-black border-2-before border-2-after2',
            },
            OCCUPATION: {
                className:
                    'bg-color-yellow relative border-x-2 border-black border-2-before border-2-after2',
            },
            'SOLO PARENT': {
                className:
                    'bg-color-yellow relative border-x-2 border-black border-2-before border-2-after2',
            },
            ADDRESS: {
                className:
                    'bg-color-yellow relative border-x-2 border-black border-2-before border-2-after2',
            },
            'CONTACT NUMBER': {
                className:
                    'bg-color-yellow relative border-x-2 border-black border-2-before border-2-after2',
            },
        },
    ])
    tableConfig['child_information_table'].no_data_default_value = '.'
    tableConfig['nutritional_status_table'].no_data_default_value = '.'
    tableConfig['parents_information_table'].no_data_default_value = '.'
    tableConfig['child_information_table'].row_selection_mode = true
    tableConfig['child_information_table'].selected_row_design =
        'bg-red-200 cursor-default'
    tableConfig['child_information_table'].selected_cell_design =
        'border-2 border-gray-500 bg-transparent h-8'
    setDataSet('child_information_table')
    setDataSet('nutritional_status_table')
    setDataSet('parents_information_table')
    setTableView('child_information_table', {
        value: 'registration_number',
        exclude: true,
    })
    setTableView('nutritional_status_table', {
        value: 'registration_number',
        exclude: true,
    })
    setTableView('parents_information_table', {
        value: 'registration_number',
        exclude: true,
    })
    extend_event['child_information_table'].tbody_onClick = function (e) {
        const cell = e.target,
            row = cell.parentNode,
            rowIndex = row.rowIndex,
            tableID = row.parentNode.parentNode.id
        if (!cell) return false
        if (!row) return false
        if (!row.id) return false
        if (!rowIndex) return false
        // console.log(row.id)
        setDataSet('nutritional_status_table', [
            session_list['nutritional_status'][rowIndex - 1],
        ])
        setDataSet(
            'parents_information_table',
            session_list['parents_information'][rowIndex - 1]
        )
        setTableView('nutritional_status_table', {
            value: 'registration_number',
            exclude: true,
        })
        setTableView('parents_information_table', {
            value: 'registration_number',
            exclude: true,
        })
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
function diff_months(d2, d1) {
    let months
    months = (d2.getFullYear() - d1.getFullYear()) * 12
    months -= d1.getMonth()
    months += d2.getMonth()
    return months <= 0 ? 0 : months
    // Calculate the difference in milliseconds between the two dates.
    // var diff = (dt2.getTime() - dt1.getTime()) / 1000
    // Convert the difference from milliseconds to months by dividing it by the number of milliseconds in an hour, a day, a week, and approximately 4 weeks in a month.
    // diff /= 60 * 60 * 24 * 7 * 4
    // Round the result to the nearest integer using Math.round().
    // return Math.abs(Math.round(diff))
}
function clearRelatedTables() {
    setDataSet('nutritional_status_table')
    setDataSet('parents_information_table')
    setTableView('nutritional_status_table', {
        value: 'registration_number',
        exclude: true,
    })
    setTableView('parents_information_table', {
        value: 'registration_number',
        exclude: true,
    })
}
/*
 */
