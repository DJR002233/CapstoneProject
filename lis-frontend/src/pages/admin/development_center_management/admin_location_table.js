'use client'
import SimpleTable, {
    addTableHeader,
    extend_event,
    setDataSet,
    setTableView,
    table,
    tableConfig,
} from '@/app/_lib/simpletableview'
import { useEffect } from 'react'
import { addLocationInputValues } from './location_form_inputs'
import { getAllLocations } from '@/app/_lib/fetch'
import { done, hide, inprogress } from '@/components/WideStatusText'

let location_data = null

export default function Admin_location_table() {
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
        <div className="mx-auto mb-10 lg:w-1/2">
            <SimpleTable
                id={{ table: 'location_table' }}
                className={className}
            />
        </div>
    )
    function load() {
        addTableHeader('location_table', [
            {
                'No.': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'Location Name': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'Location Address': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'Location Visibility': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
                'Max Registrations': {
                    className:
                        'max-w-fit min-w-fit bg-blue-400 border border-white',
                },
            },
        ])
        tableConfig['location_table'].no_data_default_value = '.'
        tableConfig['location_table'].row_selection_mode = true
        tableConfig['location_table'].selected_row_design =
            'bg-red-200 cursor-default'
        tableConfig['location_table'].selected_cell_design =
            'border border-white h-6 cursor-default'
        getLocations()
        extend_event['location_table'].tbody_onClick = function (e) {
            for (let i = 0; i < location_data.length; i++) {
                if (
                    table['location_table'].selected_row_id ==
                    location_data[i]['location_number']
                )
                    addLocationInputValues(location_data[i])
            }
        }
    }
}
async function getLocations() {
    inprogress('getting list of locations...')
    const locations = await getAllLocations(),
        objectOrder = {
            'No.': null,
        }
    locations.forEach((e, i) => {
        locations[i]['No.'] = i + 1
        locations[i] = Object.assign(structuredClone(objectOrder), locations[i])
    })
    location_data = structuredClone(locations)
    locations.forEach((e, i) => {
        if (locations[i]['status'] == 1) {
            locations[i]['status'] = 'Visible'
        } else {
            locations[i]['status'] = 'Invisible'
        }
    })
    setDataSet('location_table', locations)
    setTableView('location_table', {
        value: 'location_number',
        exclude: true,
    })
    done('list of location loading finished!', 1500)
}
export async function refreshLocationsTable() {
    await getLocations()
}
