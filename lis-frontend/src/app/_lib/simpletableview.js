'use client'

const table_id = [],
    DataSet = {},
    table_Struct = {},
    table_Config = {},
    events = {}
export default function SimpleTable({ className = {}, id = {} }) {
    const tableID = id.table
    if (tableID == null || tableID == undefined)
        throw new Error('table id is required')
    // _proto_table_Config.prototype.setNoDataDefaultValue = function (value) {
    //     return (this.no_data_default_value = value)
    // }
    table_Struct[tableID] = new _proto_table_Struct()
    table_Config[tableID] = new _proto_table_Config()
    table_Struct[tableID].tr_className = className.tr
    table_Struct[tableID].td_className = className.td
    events[tableID] = new _proto_events()
    if (table_id.indexOf(tableID) < 0) table_id.push(tableID)
    // console.log(tableConfig['child_information_table'])
    return (
        <div className={className.div}>
            <table
                className={className.table}
                onClick={table_onClick}
                id={id.table}
            >
                <thead
                    className={className.thead}
                    onClick={thead_onClick}
                    id={id.thead}
                >
                    <tr className={className.trh} id={id.trh}>
                        <th className={className.th} id={id.th}></th>
                    </tr>
                </thead>
                <tbody
                    className={className.tbody}
                    onClick={tbody_onClick}
                    id={id.tbody}
                >
                    <tr className={className.tr} id={id.tr}>
                        <td className={className.td} id={id.td}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
    function _proto_table_Struct() {
        this.thead_struct = {}
        this.tr_className = null
        this.td_className = null
        this.selected_row_id = null
        this.selected_row_name = null
        this.selected_row_value = null
        this.selected_cell_id = null
        this.selected_cell_name = null
        this.selected_cell_value = null
        this.selected_col_id = null
        this.selected_col_name = null
        this.selected_col_value = null
    }
    function _proto_table_Config() {
        this.col_selection_mode = false
        this.row_selection_mode = false
        this.cell_selection_mode = false
        this.selected_col_design = null
        this.selected_row_design = null
        this.selected_cell_design = null
        this.no_data_default_value = null
    }
    function _proto_events() {
        this.tbody_onClick = null
    }
}
/* onClick functions of table */
function table_onClick(e) {}
function thead_onClick(e) {}
function tbody_onClick(e) {
    if (!e) return true
    const cell = e.target,
        row = cell.parentNode,
        tableID = row.parentNode.parentNode.id
    if (!tableID) return true
    if (!row) return true
    if (table_Config[tableID].row_selection_mode) {
        const selected_row = table_Struct[tableID].selected_row_id,
            column_count = row.cells.length
        if (selected_row) {
            if (document.getElementById(selected_row)) {
                document.getElementById(selected_row).className =
                    table_Struct[tableID].tr_className
                for (let count = 0; count < column_count; count++) {
                    if (document.getElementById(selected_row + '_' + count)) {
                        document.getElementById(
                            selected_row + '_' + count
                        ).className = table_Struct[tableID].td_className
                    }
                }
            }
        }
        const row_value = []
        if (document.getElementById(row.id))
            document.getElementById(row.id).className =
                table_Config[tableID].selected_row_design
        for (let count = 0; count < column_count; count++) {
            if (document.getElementById(row.id + '_' + count)) {
                document.getElementById(row.id + '_' + count).className =
                    table_Config[tableID].selected_cell_design
                row_value.push(
                    document.getElementById(row.id + '_' + count).innerText
                )
            }
        }
        table_Struct[tableID].selected_row_id = row.id
        table_Struct[tableID].selected_row_name = row.name
        table_Struct[tableID].selected_row_value = row_value
    }
    if (table_Config[tableID].col_selection_mode) {
    }
    if (table_Config[tableID].cell_selection_mode) {
        if (
            selected_cell &&
            document.getElementById(selected_cell).id != undefined
        )
            document.getElementById(selected_cell).className = def
        document.getElementById(cell.id).className = sel
    }
    const run = events[tableID].tbody_onClick
    if (run) run(e)
}
/* -------------------------- */

export function addTableHeader(tableID, rows) {
    check_table_error(tableID)
    table_Struct[tableID].thead_struct = {}
    table_Struct[tableID].thead_struct = rows
}
export function setDataSet(tableID, data) {
    check_table_error(tableID)
    DataSet[tableID] = {}
    DataSet[tableID] = data
}
export function setTableView(
    tableID,
    id_key = { value: null, exclude: false },
    start_index = 0
) {
    check_table_error(tableID)
    const table = document.getElementById(tableID),
        thead = table.getElementsByTagName('thead')[0],
        tbody = table.getElementsByTagName('tbody')[0],
        thead_headers = table_Struct[tableID].thead_struct,
        tbody_data = DataSet[tableID],
        tr = table_Struct[tableID].tr_className,
        td = table_Struct[tableID].td_className
    let row, cell
    if (thead_headers.length >= 0) {
        thead.innerHTML = ''
        for (let row_index = 0; row_index < thead_headers.length; row_index++) {
            row = thead.insertRow(-1)
            Object.keys(thead_headers[row_index]).forEach((key) => {
                cell = row.insertCell(-1)
                // attribute checking and inserting
                {
                    // checks if id exists then add id attribute to cell
                    if (thead_headers[row_index][key]['id'])
                        cell.id = thead_headers[row_index][key]['id']
                    // checks if className is type string then add className attribute to cell
                    if (
                        typeof thead_headers[row_index][key]['className'] ==
                        'string'
                    )
                        cell.className =
                            thead_headers[row_index][key]['className']
                    // checks if colSpan is type number then add colSpan attribute to cell
                    if (
                        typeof thead_headers[row_index][key]['colSpan'] ==
                        'number'
                    )
                        cell.colSpan = thead_headers[row_index][key]['colSpan']
                    // checks if rowSpan is type number then add rowSpan attribute to cell
                    if (
                        typeof thead_headers[row_index][key]['rowSpan'] ==
                        'number'
                    )
                        cell.rowSpan = thead_headers[row_index][key]['rowSpan']
                }
                cell.innerText = key
            })
        }
    }
    tbody.innerHTML = ''
    if (tbody_data && tbody_data.length > 0 && tbody_data[0]) {
        // checks if id_key is undefined in tbody_data then set id_key to false
        if (tbody_data[0][id_key.value] == undefined) id_key.value = false
        // console.log(tbody_data[0]['lol'])
        for (let row_index = 0; row_index < tbody_data.length; row_index++) {
            row = tbody.insertRow(-1)
            // checks if tr_className is type string then set className attribute of cell to tr_className
            if (typeof tr == 'string') row.className = tr
            // checks if id_key exists then set id and name attribute to id_key else set id and name to start_index and increment start_index by 1
            {
                if (id_key.value) {
                    row.id = tbody_data[row_index][id_key.value]
                    row.name = tbody_data[row_index][id_key.value]
                } else {
                    row.id = start_index
                    row.name = start_index
                    start_index++
                }
            }
            let id_value = 0
            const key = Object.keys(tbody_data[row_index])
            for (let i = 0; i != key.length; i++) {
                if (key[i] == id_key.value && id_key.exclude) continue
                // if (key == id_key.value && id_key.include)
                cell = row.insertCell(-1)
                // checks if id_key exists then set cell id to id_key string else set id to start_index string
                cell.id = id_key.value
                    ? tbody_data[row_index][id_key.value] + '_' + id_value
                    : start_index + '_' + id_value
                // checks if id_key exists then set cell name to id_key string else set name to start_index string
                cell.name = id_key.value
                    ? tbody_data[row_index][id_key.value]
                    : start_index
                // checks if td_className is type string then set className attribute of cell to td_className
                if (typeof td == 'string') cell.className = td
                cell.innerText = tbody_data[row_index][key[i]]
                id_value++
            }
        }
    } else if (
        typeof table_Config[tableID].no_data_default_value == 'string' &&
        thead_headers[0]
    ) {
        row = tbody.insertRow(-1)
        for (
            let row_index = 0;
            row_index <
            Object.keys(thead_headers[thead_headers.length - 1]).length;
            row_index++
        ) {
            cell = row.insertCell(-1)
            if (typeof td == 'string') cell.className = td
            cell.innerText = table_Config[tableID].no_data_default_value
        }
    }
}
export const table = {
    __proto__: table_Struct,
}
export const tableConfig = {
    __proto__: table_Config,
}
export const extend_event = {
    __proto__: events,
}
export function filterDataSet(
    tableID,
    value = [],
    id_key = { value: null, exclude: false },
    column = ['last_name'],
    start_index = 0
) {
    const table = document.getElementById(tableID),
        tbody = table.getElementsByTagName('tbody')[0],
        thead_headers = table_Struct[tableID].thead_struct,
        tbody_data = DataSet[tableID],
        tr = table_Struct[tableID].tr_className,
        td = table_Struct[tableID].td_className
    let filteredDataSet = []
    let row, cell
    if (value)
        for (let count = 0; count < tbody_data.length; count++) {
            let chks = 0
            for (let col = 0; col < column.length; col++) {
                if (!value[col].toLowerCase()) {
                    chks++
                    continue
                }
                if (
                    tbody_data[count][column[col]].toString().toLowerCase() ==
                    value[col].toLowerCase()
                ) {
                    chks++
                }
            }
            if (chks == column.length) filteredDataSet.push(tbody_data[count])
            // for (let word = 0; word < value.length; word++) {}
        }
    tbody.innerHTML = ''
    // if (value.length == 1 && !value[0]) filteredDataSet = tbody_data
    if (filteredDataSet && filteredDataSet.length > 0) {
        if (filteredDataSet[0][id_key.value] == undefined) id_key.value = false
        for (
            let row_index = 0;
            row_index < filteredDataSet.length;
            row_index++
        ) {
            row = tbody.insertRow(-1)
            if (typeof tr == 'string') row.className = tr
            {
                if (id_key.value) {
                    row.id = filteredDataSet[row_index][id_key.value]
                    row.name = filteredDataSet[row_index][id_key.value]
                } else {
                    row.id = start_index
                    row.name = start_index
                    start_index++
                }
            }
            let id_value = 0
            const key = Object.keys(filteredDataSet[row_index])
            for (let i = 0; i != key.length; i++) {
                if (key[i] == id_key.value && id_key.exclude) continue
                cell = row.insertCell(-1)
                cell.id = id_key.value
                    ? filteredDataSet[row_index][id_key.value] + '_' + id_value
                    : start_index + '_' + id_value
                cell.name = id_key.value
                    ? filteredDataSet[row_index][id_key.value]
                    : start_index
                if (typeof td == 'string') cell.className = td
                cell.innerText = filteredDataSet[row_index][key[i]]
                id_value++
            }
        }
        return filteredDataSet
    } else if (
        typeof table_Config[tableID].no_data_default_value == 'string' &&
        thead_headers[0]
    ) {
        row = tbody.insertRow(-1)
        for (
            let row_index = 0;
            row_index <
            Object.keys(thead_headers[thead_headers.length - 1]).length;
            row_index++
        ) {
            cell = row.insertCell(-1)
            if (typeof td == 'string') cell.className = td
            cell.innerText = table_Config[tableID].no_data_default_value
        }
    }
}
export function getRowCount(tableID) {
    let count = document.getElementById(tableID).tBodies[0].rows.length
    if (count > 0)
        if (!document.getElementById(tableID).tBodies[0].rows[0].id) count = 0
    return count
}
/* Error Check. throws error */
function check_table_error(table) {
    if (!table || typeof table != 'string')
        throw new Error('table id type string is required')
    if (table_id.indexOf(table) < 0)
        throw new Error('table "' + table + '" is undefined')
}
