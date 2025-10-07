'use client'
import {
    getSession_Evaluation,
    session,
    uploadSession_Grades,
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
import { GradingSheetExcelFile_upload } from '../../../app/_lib/excelUpload'
import { addScores, resetScores } from './scores'
import { addScaledScores, resetTable } from './scaledscores'
import { addStandardScores, resetStandardScores } from './standardscores'
import { done, hide, inprogress, warning } from '@/components/WideStatusText'
import { getLocationCookies } from '@/app/_lib/cookies'

const session_list = []
let evaluation_scores = null

export default function Grades() {
    const [total, settotal] = useState(0)
    const [male, setmale] = useState(0)
    const [female, setfemale] = useState(0)
    const [errorMessage, seterrorMessage] = useState({
        className: '',
        innerText: '',
    })
    useEffect(() => {
        load_table()
        hide()
        const session_value = getCookie('session_value')
        if (session_value && session_value != 0) {
            getSessionData(session_value)
            getEvaluationFormsData(session_value)
            document.getElementById('dropdownBox').value = session_value
        }
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
                <button
                    className={
                        'mx-8 border border-blue-500 bg-blue-300 px-2 py-0.5'
                    }
                    onClick={uploadGrades_onClick}
                >
                    {'Upload Grading Sheet Evaluation Form'}
                </button>
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
    function uploadGrades_onClick() {
        seterrorMessage({
            className: '',
            innerText: '',
        })
        const xlsxFile = document.createElement('input'),
            session_value = session_list.session_value
        if (Number.isNaN(parseInt(session_value))) {
            alert('Session is not valid')
            return false
        }
        xlsxFile.type = 'file'
        xlsxFile.accept = '.xlsx'
        xlsxFile.click()
        xlsxFile.onchange = async (e) => {
            inprogress('Uploading grades...')
            const formdata = new FormData()
            formdata.append('xlsxFile', e.target.files[0])
            const res = await GradingSheetExcelFile_upload(
                formdata,
                session_list['child_information'],
                session_value
            )
            // console.log(res)
            // return true
            hide()
            if (res.status == 'Error') {
                seterrorMessage({
                    className:
                        'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                    innerText: res.message,
                })
            } else if (res.status == 'success') {
                await getEvaluationFormsData(session_value)
                alert('Evaluation grades has been uploaded successfully!')
            } else {
                seterrorMessage({
                    className:
                        'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                    innerText:
                        'something went wrong! Please contact tech support Error_Code:FE1',
                })
            }
            // console.log(res)
        }
    }
    async function getEvaluationFormsData(session_value) {
        if (session_value) {
            evaluation_scores = await getSession_Evaluation(session_value)
        }
    }
    async function viewSession() {
        seterrorMessage({
            className: '',
            innerText: '',
        })
        const session_value = document.getElementById('dropdownBox').value
        await getSessionData(session_value)
        resetScores()
        resetTable()
        resetStandardScores()
        const now = new Date(),
            time = now.getTime(),
            expireTime = time + 1000 * 60 * 240
        now.setTime(expireTime)
        // console.log(now)
        document.cookie =
            'session_value=' +
            session_value +
            ';expires=' +
            now.toUTCString() +
            ';Path=/'
    }
    async function getSessionData(session_value) {
        inprogress('getting session list...')
        const list = await session(session_value, await getLocationCookies()) //,
        /*objectOrder = {
                'No.': null,
            }/**/
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
        session_list['school_year'] = list.data[0]['school_year']
        for (let i = 0; i < list.data.length; i++) {
            if (list.data[i].gender == 'male') {
                entries['male']++
            } else entries['female']++
            delete list.data[i].nutritional_status
            delete list.data[i].parents_information
            delete list.data[i].school_year
            // list.data[i]['No.'] = i + 1
            const created_at = new Date(list.data[i]['created_at']),
                date_of_birth = new Date(list.data[i]['date_of_birth'])
            list.data[i]['Age_in_months'] = diff_months(
                created_at,
                date_of_birth
            )
            delete list.data[i].created_at
            /*list.data[i] = Object.assign(
                structuredClone(objectOrder),
                list.data[i]
            )/**/
        }
        setDataSet('child_information_table', list.data)
        await getEvaluationFormsData(session_value)
        setTableView('child_information_table', {
            value: 'registration_number',
            exclude: false,
        })
        session_list['child_information'] = list.data
        session_list['location_number'] = list.location_number
        session_list['location_name'] = list.location_name
        session_list['staff_name'] = list.staff_name
        session_list['session_value'] = session_value
        settotal(entries.total)
        setmale(entries.male)
        setfemale(entries.female)
        done(null, 1500)
    }
}
function load_table() {
    addTableHeader('child_information_table', [
        {
            'Child Code': {
                className:
                    'w-20 relative border-x-2 border-black border-2-before border-2-after2',
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
    setDataSet('child_information_table', [])
    setTableView('child_information_table', {
        value: 'registration_number',
        exclude: false,
    })
    extend_event['child_information_table'].tbody_onClick = function (e) {
        if (!e) return false
        const cell = e.target
        if (!cell) return false
        if (!cell.id) return false
        const row = cell.parentNode
        if (!row) return false
        const rowIndex = row.rowIndex
        if (!rowIndex) return false
        const reg_num = table['child_information_table'].selected_row_id,
            data = []
        if (evaluation_scores) {
            for (let i = 0; i < evaluation_scores['Eval1'].length; i++) {
                const id = evaluation_scores['Eval1'][i]
                if (id['registration_number'] == reg_num) data[0] = id
            }
            for (let i = 0; i < evaluation_scores['Eval2'].length; i++) {
                const id = evaluation_scores['Eval2'][i]
                if (id['registration_number'] == reg_num) data[1] = id
            }
            for (let i = 0; i < evaluation_scores['Eval3'].length; i++) {
                const id = evaluation_scores['Eval3'][i]
                if (id['registration_number'] == reg_num) data[2] = id
            }
        }
        addScores(data, reg_num)
        addScaledScores(data, reg_num)
        addStandardScores(data, reg_num)
    }
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
