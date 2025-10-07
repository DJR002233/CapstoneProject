'use client'
import { getStaffInformation } from '@/app/_lib/fetch'
import { TextBox } from '@/app/_lib/form-html'
import SimpleTable, {
    tableConfig,
    addTableHeader,
    setTableView,
    setDataSet,
    filterDataSet,
    table,
    extend_event,
} from '@/app/_lib/simpletableview'
import { useEffect } from 'react'
import { addvalues } from './inputs'
import { done, hide, inprogress } from '@/components/WideStatusText'

let staff_informations = {}

export default function Search_table_select() {
    const className = {
        div: 'max-h-screen-75 w-full bg-slate-100 rounded-lg overflow-y-auto overflow-x-auto relative',
        table: 'w-full text-center',
        thead: 'sticky top-0 cursor-default',
        td: 'border border-white bg-blue-100 h-6 cursor-pointer',
    }
    useEffect(() => {
        hide()
        load()
    }, [])
    return (
        <div className="mb-10 xl:w-1/2">
            <select
                id="comboBox"
                className="h-8 rounded-md border border-black px-2 shadow-black drop-shadow-sm"
            >
                <option hidden>-- select column --</option>
                <option id="staff_id" value="staff_id">
                    Staff ID
                </option>
                <option id="first_name" value="first_name">
                    First Name
                </option>
                <option id="middle_name" value="middle_name">
                    Middle Name
                </option>
                <option id="last_name" value="last_name">
                    Last Name
                </option>
                <option id="suffix" value="suffix">
                    Suffix
                </option>
                <option id="assigned_location" value="location_post">
                    Assigned Location
                </option>
                <option id="authorization_level" value="authorization_level">
                    Authorization Level
                </option>
            </select>
            <TextBox
                className="ms-2 rounded-md border border-black px-1 shadow-black drop-shadow-md"
                id="searchBox"
                placeholder="search"
                onKeyUp={searchStaffInformation}
            />
            <button
                className="ms-4 border border-blue-500 bg-blue-300 px-2"
                type="button"
                onClick={searchStaffInformation}
            >
                Search
            </button>
            <SimpleTable id={{ table: 'users_table' }} className={className} />
        </div>
    )
    function load() {
        addTableHeader('users_table', [
            {
                'Staff ID': {
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
                'Last Name': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                Suffix: {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'Assigned Location': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'Authorization Level': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
            },
        ])
        tableConfig['users_table'].no_data_default_value = '.'
        tableConfig['users_table'].row_selection_mode = true
        tableConfig['users_table'].selected_row_design =
            'bg-red-200 cursor-default'
        tableConfig['users_table'].selected_cell_design =
            'border border-white h-6 cursor-default'
        displayStaffInformation()
        extend_event['users_table'].tbody_onClick = function (e) {
            for (let i = 0; i < staff_informations.length; i++) {
                if (
                    table['users_table'].selected_row_value[0] ==
                    staff_informations[i]['staff_id']
                )
                    addvalues(staff_informations[i])
            }
        }
    }
}
async function searchStaffInformation(e) {
    const target = e.target,
        option = document.getElementById('comboBox'),
        search_value = document.getElementById('searchBox').value
    if (e.key == 'Enter' || e.keyCode == 13 || target.type == 'button') {
        if (option.selectedIndex <= 0) {
            alert('Please choose a column to search')
            return true
        }
        if (await displayStaffInformation()) {
            filterDataSet(
                'users_table',
                [search_value],
                {
                    value: 'staff_id',
                    exclude: false,
                },
                [option.value]
            )
        }
    }
}
async function displayStaffInformation() {
    inprogress('getting staff list...')
    const res = await getStaffInformation()
    staff_informations = res
    const dupe_staff_informations = structuredClone(staff_informations)
    for (let i = 0; i < dupe_staff_informations.length; i++) {
        delete dupe_staff_informations[i]['finished_grading']
        delete dupe_staff_informations[i]['location_post']
    }
    setDataSet('users_table', dupe_staff_informations)
    setTableView('users_table', {
        value: 'staff_id',
        exclude: false,
    })
    done('staff list loading finished!', 1500)
    return true
}
export function refreshTable() {
    displayStaffInformation()
}
