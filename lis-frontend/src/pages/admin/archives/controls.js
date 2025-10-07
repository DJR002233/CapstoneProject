'use client'
import { getArchivesData, session } from '@/app/_lib/fetch'
import { TextBox } from '@/app/_lib/form-html'
import {
    addTableHeader,
    setDataSet,
    setTableView,
    filterDataSet,
    table,
    tableConfig,
} from '@/app/_lib/simpletableview'
import { done, hide, inprogress, warning } from '@/components/WideStatusText'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
let selected_year = null
export default function ArchiveControls({ school_years = [] }) {
    const router = useRouter()
    let data = null
    useEffect(() => {
        load()
        hide()
    }, [])
    const SY_options = []
    for (let i = 0; i < school_years.length; i++) {
        const x = school_years[i]
        SY_options.push(
            <option key={i} id={x.school_year} value={x.school_year}>
                {x.school_year}
            </option>
        )
    }
    return (
        <div className="my-4 flex items-end">
            <div>
                <select id="comboBox" className="h-8 border border-black px-2">
                    <option hidden>-- select school year (SY) --</option>
                    <option id="year_all" value="0">
                        All Time
                    </option>
                    {SY_options}
                </select>
                <select
                    id="dropdownBox"
                    className="h-8 border border-black px-2 md:ms-4"
                >
                    <option hidden>-- select session --</option>
                    <option id="session_all" value="">
                        All Sessions
                    </option>
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
                <div className="mt-4 flex flex-wrap items-center">
                    <label className="me-2" htmlFor="searchbox">
                        Search Name:
                    </label>
                    <TextBox
                        className={'rounded-md border border-black px-1'}
                        id={'searchbox'}
                        name={'searchbox'}
                        placeholder={'Enter last name'}
                        list={'archive_lst'}
                        onKeyUp={tableSearch}
                    />
                    <datalist id="archive_lst"></datalist>
                    <button
                        className="mx-auto mt-2 h-10 border border-blue-500 bg-blue-300 px-8 lg:ms-4 lg:mt-0"
                        onClick={tableSearch}
                        type="Button"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="ms-auto">
                <button
                    className="ms-5 h-10 border border-blue-500 bg-blue-300 px-8"
                    onClick={ViewProfile_onClick}
                >
                    View Profile
                </button>
                <button
                    className="ms-5 h-10 border border-blue-500 bg-blue-300 px-8"
                    onClick={ViewGrades_onClick}
                >
                    View Grades
                </button>
            </div>
        </div>
    )
    async function tableSearch(e) {
        const target = e.target,
            val = document.getElementById('searchbox').value.trim()
        if (
            (target.type == 'text' &&
                (e.key === 'Enter' || e.keyCode === 13)) ||
            target.type == 'button'
        ) {
            const sy = document.getElementById('comboBox').value,
                sn = document.getElementById('dropdownBox').value
            if (Number.isNaN(parseInt(sy))) {
                alert('Please select school year first')
                return false
            }
            if (Number.isNaN(parseInt(sn)) && sn != '') {
                alert('Please select session number first')
                return false
            }
            inprogress('Searching...')
            if (await getArchives()) {
                filterDataSet(
                    'archives_table',
                    [val, sn],
                    {
                        value: 'registration_number',
                        exclude: false,
                    },
                    ['last_name', 'session']
                )
            }
            done('Search Complete!', 1500)
        }
    }
    async function getArchives() {
        const year = document.getElementById('comboBox').value
        if (selected_year == year) return true
        selected_year = year
        data = await getArchivesData(year)
        // const objectOrder = {
        //     'No.': null,
        // }
        // for (let i = 0; i < data.length; i++) {
        //     data[i]['No.'] = i + 1
        //     data[i] = Object.assign(structuredClone(objectOrder), data[i])
        // }
        // console.log(data)
        setDataSet('archives_table', data)
        setTableView('archives_table', {
            value: 'registration_number',
            exclude: false,
        })
        const dl = document.getElementById('archive_lst')
        dl.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
            let option = document.createElement('option')
            option.value = data[i].last_name
            dl.appendChild(option)
        }
        return true
    }
    function ViewProfile_onClick() {
        inprogress('loading registration form data...')
        const id = table['archives_table'].selected_row_id
        if (id) {
            router.push(
                '/admin/registration-form?' + 'reg_no=' + id + '&archive=true'
            )
            return true
        }
        warning('No selected record!', 1500)
    }
    function ViewGrades_onClick() {
        const id = table['archives_table'].selected_row_id
        if (id) {
            router.push('/admin/archives/grade?' + 'reg_no=' + id)
            return true
        }
        warning('No selected record!', 1500)
    }
}
function load() {
    selected_year = null
    addTableHeader('archives_table', [
        {
            'Child Code': {
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
                className: 'w-40 bg-blue-400 border border-white',
            },
            'Session Number': {
                className:
                    'max-w-fit min-w-fit bg-blue-400 border border-white',
            },
        },
    ])
    tableConfig['archives_table'].no_data_default_value = '.'
    tableConfig['archives_table'].row_selection_mode = true
    tableConfig['archives_table'].selected_row_design = 'bg-red-200'
    tableConfig['archives_table'].selected_cell_design =
        'border border-white bg-transparent h-6 cursor-default'
    setDataSet('archives_table')
    setTableView('archives_table', {
        value: 'registration_number',
        exclude: false,
    })
}
