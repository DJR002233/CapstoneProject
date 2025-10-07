'use client'
import { getLocationCookies } from '@/app/_lib/cookies'
import {
    enrolled_forms,
    excluded_forms,
    registration_forms,
} from '@/app/_lib/fetch'
import { TextBox } from '@/app/_lib/form-html'
import {
    table,
    addTableHeader,
    setDataSet,
    setTableView,
    tableConfig,
    filterDataSet,
    getRowCount,
} from '@/app/_lib/simpletableview'
import { done, hide, inprogress, warning } from '@/components/WideStatusText'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Panel() {
    const router = useRouter()
    const [btn1opacity, setbtn1opacity] = useState('opacity-100')
    const [btn2opacity, setbtn2opacity] = useState('opacity-70')
    const [btn3opacity, setbtn3opacity] = useState('opacity-70')
    useEffect(() => {
        // if (run_once) {
        addTableHeader('registration_forms_table', [
            {
                'No.': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'Last Name': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'First Name': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'Middle Name': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                Suffix: {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'Date of Birth': {
                    className: 'w-40 bg-blue-400 border border-white',
                },
                Gender: {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
            },
        ])
        tableConfig['registration_forms_table'].no_data_default_value = '.'
        tableConfig['registration_forms_table'].row_selection_mode = true
        tableConfig['registration_forms_table'].selected_row_design =
            'bg-red-200'
        tableConfig['registration_forms_table'].selected_cell_design =
            'border border-white bg-transparent h-6 cursor-default'
        setDataSet('registration_forms_table')
        setTableView('registration_forms_table', {
            value: 'registration_number',
            exclude: true,
        })
        const selected_tab_cookie = getCookie('registration_forms_selected_row')
        if (selected_tab_cookie) {
            tableTab_select(parseInt(selected_tab_cookie))
        } else {
            tableTab_select(1)
        }
        // hide()
        // run_once = false
        // }
    }, [])
    return (
        <>
            <div className="mt-5 flex w-full flex-wrap items-center">
                <div className="flex">
                    <label className="me-2" htmlFor="searchbox">
                        Search Name:
                    </label>
                    <TextBox
                        className={'rounded-md border border-black px-1'}
                        id={'searchbox'}
                        name={'searchbox'}
                        placeholder={'child last name'}
                        list={'lst'}
                        onKeyUp={tableSearch}
                    />
                    <datalist id="lst"></datalist>
                </div>
                <button
                    className="mx-auto mt-2 rounded-md border border-blue-500 bg-blue-300 px-2 py-1 sm:ms-5 sm:mt-0"
                    onClick={ViewProfile_onClick}
                >
                    View Profile/Form
                </button>
                <div className="mx-auto mt-2 flex lg:mt-0">
                    <button
                        className={
                            'rounded-s-md border border-blue-500 bg-blue-300 px-2 py-1' +
                            ' ' +
                            btn1opacity
                        }
                        onClick={showRegistrationForms}
                    >
                        Registration Forms
                    </button>
                    <button
                        className={
                            'border border-blue-500 bg-blue-300 px-2 py-1' +
                            ' ' +
                            btn2opacity
                        }
                        onClick={showExcludedForms}
                    >
                        Excluded
                    </button>
                    <button
                        className={
                            'rounded-e-md border border-blue-500 bg-blue-300 px-2 py-1' +
                            ' ' +
                            btn3opacity
                        }
                        onClick={showEnrolledForms}
                    >
                        Enrolled
                    </button>
                </div>
            </div>
            <p id="count" className="mt-3">
                Entries:
            </p>
        </>
    )
    function tableSearch(e) {
        const textbox = e.target
        if (e.key === 'Enter' || e.keyCode === 13) {
            filterDataSet('registration_forms_table', [textbox.value], {
                value: 'registration_number',
                exclude: true,
            })
            setEntriesCounter()
        }
    }
    function ViewProfile_onClick() {
        inprogress('loading registration form data...')
        const id = table['registration_forms_table'].selected_row_id
        if (id) {
            router.push('/faculty-portal/registration-form?' + 'reg_no=' + id)
            return true
        }
        warning('No selected record!', 1500)
    }

    async function showRegistrationForms() {
        tableTab_select(1)
    }
    function showExcludedForms() {
        tableTab_select(2)
    }
    function showEnrolledForms() {
        tableTab_select(3)
    }
    function tableTab_select(tab = 1) {
        if (tab < 1 || tab > 3) return false
        if (tab == 1) {
            setbtn1opacity('opacity-100')
            setbtn2opacity('opacity-70')
            setbtn3opacity('opacity-70')
        } else if (tab == 2) {
            setbtn1opacity('opacity-70')
            setbtn2opacity('opacity-100')
            setbtn3opacity('opacity-70')
        } else if (tab == 3) {
            setbtn1opacity('opacity-70')
            setbtn2opacity('opacity-70')
            setbtn3opacity('opacity-100')
        }
        getData(tab)
        const now = new Date(),
            time = now.getTime(),
            expireTime = time + 1000 * 60 * 240
        now.setTime(expireTime)
        // console.log(now)
        document.cookie =
            'registration_forms_selected_row=' +
            tab +
            ';expires=' +
            now.toUTCString() +
            ';Path=/'
    }
}
async function getData(i) {
    let data = null
    if (i == 1) {
        inprogress('getting registration forms...')
        data = await registration_forms(await getLocationCookies())
        setDataSet('registration_forms_table', data)
        setTableView('registration_forms_table', {
            value: 'registration_number',
            exclude: true,
        })
    } else if (i == 2) {
        inprogress('getting excluded forms...')
        data = await excluded_forms(await getLocationCookies())
        setDataSet('registration_forms_table', data)
        setTableView('registration_forms_table', {
            value: 'registration_number',
            exclude: true,
        })
    } else if ((i = 3)) {
        inprogress('getting enrolled forms...')
        data = await enrolled_forms(await getLocationCookies())
        setDataSet('registration_forms_table', data)
        setTableView('registration_forms_table', {
            value: 'registration_number',
            exclude: true,
        })
    }
    if (!data) return true
    let dl = document.getElementById('lst')
    dl.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.value = data[i].last_name
        dl.appendChild(option)
    }
    setEntriesCounter()
    done('forms finished loading!', 1500)
}
function setEntriesCounter() {
    document.getElementById('count').innerText =
        'Entries: ' + getRowCount('registration_forms_table')
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
