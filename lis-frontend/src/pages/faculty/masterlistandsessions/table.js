import SimpleTable from '@/app/_lib/simpletableview'

export default function Table() {
    const className = {
        main_table: {
            div: 'max-h-screen-60 my-2 w-full overflow-x-auto overflow-y-auto bg-slate-300',
            table: 'w-full text-center',
            thead: 'sticky top-0 bg-color-yellow cursor-default',
            tbody: 'bg-white',
            tr: '',
            td: 'border-2 border-gray-500 bg-white h-8 cursor-pointer',
        },
        table_2: {
            div: 'max-h-screen-60 my-4 w-full overflow-x-auto bg-slate-300',
            table: 'w-full text-center',
            thead: 'cursor-default bg-blue-400',
            tbody: 'bg-white',
            tr: 'cursor-default',
            th: 'relative border-x-2 border-black border-2-before border-2-after2',
            td: 'border-2 border-gray-500 h-8',
        },
        table_3: {
            div: 'max-h-screen-60 my-2 w-full overflow-x-auto bg-slate-300',
            table: 'w-full text-center',
            thead: 'sticky top-0 bg-color-yellow cursor-default',
            tbody: 'bg-white',
            tr: 'cursor-default',
            th: 'relative border-x-2 border-black border-2-before border-2-after2',
            td: 'border-2 border-gray-500 h-8',
        },
    },
        id = {
            main_table: { table: 'child_information_table' },
            table_2: { table: 'nutritional_status_table' },
            table_3: { table: 'parents_information_table' },
        }
    return (
        <>
            <SimpleTable className={className.main_table} id={id.main_table} />
            <SimpleTable className={className.table_2} id={id.table_2} />
            <SimpleTable className={className.table_3} id={id.table_3} />
        </>
    )
}

/*
let selected_cell,
    hasRows = false,
    tableData,
    defval = '.',
    count = [{ total: 0, males: 0, females: 0 }]
const className = {
    table: 'w-full text-center',
    thead: 'sticky top-0 bg-color-yellow cursor-default',
    tbody: 'bg-white',
    tr: 'cursor-default',
    th: 'relative border-x-2 border-black border-2-before border-2-after2',
    td: 'border-2 border-gray-500 h-8',
}
<div className="mb-4 mt-3 text-black">
            <div className="max-h-screen-60 my-2 w-full overflow-x-auto overflow-y-auto bg-slate-300">
                <table id="tbl_child_information" className={className.table}>
                    <thead className={className.thead}>
                        <tr>
                            <th className={className.th}>NO.</th>
                            <th className={className.th}>GENDER</th>
                            <th className={className.th}>SURNAME</th>
                            <th className={className.th}>FIRST NAME</th>
                            <th className={className.th}>MIDDLE NAME</th>
                            <th className={className.th}>DATE OF BIRTH</th>
                            <th className={className.th}>AGE IN MOS.</th>
                        </tr>
                    </thead>
                    <tbody
                        onClick={select_cell}
                        id="tbody_child_information"
                        className={className.tbody}
                    >
                        <tr className={className.tr}>
                            <td className={className.td}>loading</td>
                            <td className={className.td}>loading</td>
                            <td className={className.td}>loading</td>
                            <td className={className.td}>loading</td>
                            <td className={className.td}>loading</td>
                            <td className={className.td}>loading</td>
                            <td className={className.td}>loading</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="max-h-screen-60 my-4 w-full overflow-x-auto bg-slate-300">
                <table id="tbl_nutritional_status" className={className.table}>
                    <thead className="cursor-default bg-blue-400">
                        <tr className="bg-color-yellow">
                            <th className={className.th} colSpan={10}>
                                NUTRITIONAL STATUS
                            </th>
                        </tr>
                        <tr className="bg-color-yellow">
                            <th className={className.th} colSpan={2}>
                                HEIGHT
                            </th>
                            <th className={className.th} colSpan={2}>
                                WEIGHT
                            </th>
                            <th className={className.th} colSpan={5}>
                                OTHER HEALTH SERVICES
                            </th>
                        </tr>
                        <tr>
                            <th className={className.th}>Height in cm</th>
                            <th className={className.th}>STATUS</th>
                            <th className={className.th}>Weight in Kg</th>
                            <th className={className.th}>STATUS</th>
                            <th className={className.th}>VIT A</th>
                            <th className={className.th}>Deworming</th>
                            <th className={className.th}>4P's</th>
                            <th className={className.th}>DISABILITY</th>
                            <th className={className.th}>PWDs</th>
                        </tr>
                    </thead>
                    <tbody
                        id="tbody_nutritional_status"
                        className={className.tbody}
                    >
                        <tr className={className.tr}>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="max-h-screen-60 my-2 w-full overflow-x-auto bg-slate-300">
                <table
                    id="tbl_related_child_information"
                    className={className.table}
                >
                    <thead className={className.thead}>
                        <tr>
                            <th className={className.th}>PARENT / GUARDIAN</th>
                            <th className={className.th}>OCCUPATION</th>
                            <th className={className.th}>SOLO PARENT</th>
                            <th className={className.th}>ADDRESS</th>
                            <th className={className.th}>CONTACT NUMBER</th>
                        </tr>
                    </thead>
                    <tbody
                        id="tbody_related_child_information"
                        className={className.tbody}
                    >
                        <tr className={className.tr}>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                            <td className={className.td}>{defval}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
function select_cell(evt) {
        const cell = evt.target.id,
            current_cell = document.getElementById(cell),
            prevCell = document.getElementById(selected_cell),
            cell_num = parseInt(evt.target.name)
        if (cell != 'tbody' && cell != null && cell != undefined) {
            if (
                selected_cell >= 0 &&
                prevCell != null &&
                prevCell != undefined
            ) {
                prevCell.className = 'cursor-pointer' + ' ' + className.td
            }
            if (current_cell != null || current_cell != undefined) {
                selected_cell = cell
                document.cookie = 'selected_cell=' + cell + '; Path=/'
                document.cookie = 'selected_cell_name=' + cell_num + '; Path=/'
                current_cell.className =
                    'bg-blue-300 cursor-default' + ' ' + className.td
            }
            related_information(cell_num)
        }
    }


function related_information(cell_num) {
    const ns_tbody = document.getElementById('tbody_nutritional_status'),
        pi_tbody = document.getElementById('tbody_related_child_information')

    if (tableData_clean(cell_num)) {
        const ns = tableData.data[cell_num].table2,
            pi = tableData.data[cell_num].table3

        let row, cell_col

        ns_tbody.innerHTML = ''
        pi_tbody.innerHTML = ''

        row = ns_tbody.insertRow(-1)
        row.className = className.tr
        if (ns != null || ns != undefined) {
            Object.keys(ns).forEach((key, i) => {
                cell_col = row.insertCell(i)
                cell_col.className = className.td
                cell_col.innerText = ns[key]
            })
        } else {
            for (let i = 0; i < 9; i++) {
                cell_col = row.insertCell(i)
                cell_col.className = className.td
                cell_col.innerText = defval
            }
        }
        if (pi[0] != null || pi[0] != undefined) {
            pi.map((entity) => {
                row = pi_tbody.insertRow(-1)
                row.className = className.tr
                Object.keys(entity).forEach((key, i) => {
                    cell_col = row.insertCell(i)
                    cell_col.className = className.td
                    cell_col.innerText = entity[key]
                })
            })
        } else {
            row = pi_tbody.insertRow(-1)
            row.className = className.tr
            for (let i = 0; i < 5; i++) {
                cell_col = row.insertCell(i)
                cell_col.className = className.td
                cell_col.innerText = defval
            }
        }
    }
}
function tableData_clean(i) {
    const ci = tableData.data[i],
        ns = tableData.data[i].nutritional_status,
        pi = tableData.data[i].parents_information

    if (ci == null || ci == undefined) {
        return false
    }

    if (ns != null || ns != undefined) {
        tableData.data[i]['table2'] = {
            height: '',
            height_status: '',
            weight: '',
            weight_status: '',
        }
        ns.map((entity) => {
            if (entity.time_state == 1) {
                const height = parseInt(entity.height_length_cm),
                    weight = parseInt(entity.weight_kg),
                    bmi = ((weight / height ** 2) * 10000).toFixed(2)
                let bmi_diag = ''
                tableData.data[i]['table2'] = {
                    height: height,
                    height_status: '',
                    weight: weight,
                    weight_status: bmi_diag,
                }
            }
        })
        if (parseInt(ci.deworming))
            tableData.data[i]['table2']['deworming'] = '✔'
        if (parseInt(ci['4ps'])) tableData.data[i]['table2']['4ps'] = '✔'
        if (parseInt(ci.pwd)) tableData.data[i]['table2']['pwd'] = '✔'
        tableData.data[i]['table2']['disability'] = ''
        if (parseInt(ci.vit_a)) tableData.data[i]['table2']['vit_a'] = '✔'
    }

    if (pi != null || pi != undefined) {
        const data = []
        let name = '',
            parent_or_guardian
        pi.map((entity) => {
            parent_or_guardian = entity.relationship_to_the_child
            if (parent_or_guardian != null || parent_or_guardian != undefined) {
                name =
                    parent_or_guardian +
                    ': ' +
                    entity.first_name +
                    ' ' +
                    entity.last_name
                data.push({
                    parent_and_guardian: name,
                    occupation: entity.occupation,
                    solo_parent: parseInt(entity.solo_parent) ? '✔' : '',
                    address: entity.address,
                    contact_number: entity.contact_number,
                })
            }
            parent_or_guardian = null
        })
        tableData.data[i]['table3'] = data
    }
    return true
}
export function getData() {
    if (tableData == null || tableData == undefined) return null
    if (tableData.data == null || tableData.data == undefined) return null
    tableData.data.map((key, i) => {
        tableData_clean(i)
    })

    return tableData
}
export function setSelected_cell(cell, cell_name) {
    if (cell && document.getElementById(cell) != null) {
        selected_cell = cell
        const row = document.getElementById(cell)
        row.className = 'bg-blue-300 cursor-default' + ' ' + className.td
        if (row.name == cell_name) {
            related_information(cell_name)
        }
    } else {
        document.cookie =
            'selected_cell=;Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }
}
export function getCellCount() {
    return count
}
export function setTableEntities(
    data,
    location_name = '',
    location_number = '',
    staff_name = ''
) {
    selected_cell = 0
    const tbody_struct = document.getElementById('tbody_child_information')
    // total = document.getElementById('total'),
    // males = document.getElementById('males'),
    // females = document.getElementById('females')
    let row,
        cell,
        maleCount = 0,
        femaleCount = 0,
        totalCount = 0
    tbody_struct.innerHTML = ''
    if (data[0] != undefined || data[0] != null) {
        tableData = {
            data: structuredClone(data),
            location_name: location_name,
            location_number: location_number,
            staff_name: staff_name,
        }
        data.map((entity) => {
            {
                delete entity['4ps']
                delete entity.address
                delete entity.contact_number
                delete entity.date_of_last_vitamin_a_intake
                delete entity.deworming
                delete entity.nutritional_status
                delete entity.parents_information
                delete entity.pwd
            }
            if (entity.gender == 'male') {
                maleCount += 1
            } else if (entity.gender == 'female') {
                femaleCount += 1
            }
            totalCount = maleCount + femaleCount
            row = tbody_struct.insertRow(-1)
            row.className = 'cursor-pointer'
            row.id = entity.registration_number
            row.name = totalCount - 1
            Object.keys(entity).forEach((key, i) => {
                if (i < 7) {
                    cell = row.insertCell(i)
                    cell.className = className.td
                    cell.id = entity.registration_number
                    cell.name = totalCount - 1
                    if (key == 'registration_number') {
                        cell.innerText = totalCount
                    } else if (key == 'age') {
                        const age_in_months = diff_months(
                            new Date(entity.date_of_birth),
                            new Date(entity.created_at)
                        )
                        cell.innerText = age_in_months
                        tableData.data[totalCount - 1].age = age_in_months
                    } else {
                        cell.innerText = entity[key]
                    }
                }
            })
        })
        // total.innerHTML = 'Number of Children: ' + totalCount
        // males.innerHTML = 'Males: ' + maleCount
        // females.innerHTML = 'Females: ' + femaleCount
        count.total = totalCount
        count.males = maleCount
        count.females = femaleCount
        hasRows = true
    } else {
        row = tbody_struct.insertRow(-1)
        row.className = 'cursor-pointer'
        for (let i = 0; i < 7; i++) {
            cell = row.insertCell(-1)
            cell.className = className.td
            cell.innerText = '.'
        }
        // total.innerHTML = 'Number of Children: 0'
        // males.innerHTML = 'Males: 0'
        // females.innerHTML = 'Females: 0'
        count.total = 0
        count.males = 0
        count.females = 0
        hasRows = false
    }
}
*/
