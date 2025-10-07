'use server'

export async function MasterlistExcelFile_download(
    data,
    school_year,
    location_name,
    location_number,
    staff_name,
    session_number
) {
    const Excel = require('exceljs'),
        basePath = process.cwd() + '/public/faculty_portal',
        templateFile = basePath + '/template/Masterlist.xlsx',
        outputPath = basePath + '/download/masterlist',
        workbook = new Excel.Workbook()
    await workbook.xlsx.readFile(templateFile)
    const sheet = workbook.getWorksheet('Masterlist')
    // Column Width 2.13" = 2.13 * 11.36363 = {width: 24.20}
    sheet.columns = [
        { key: 'No.', width: 5.11 },
        { key: 'b', width: 5.11 },
        { key: 'g', width: 5.11 },
        { key: 'last_name', width: 15.11 },
        { key: 'first_name', width: 21.59 },
        { key: 'middle_name', width: 14.77 },
        { key: 'date_of_birth', width: 13.63 },
        { key: 'Age_in_months', width: 8.52 },
        { key: 'height', width: 5.11 },
        { key: 'height_status', width: 5.11 },
        { key: 'weight', width: 5.11 },
        { key: 'weight_status', width: 5.11 },
        { key: 'vit_a', width: 5.11 },
        { key: 'deworming', width: 5.68 },
        { key: '4ps', width: 5.68 },
        { key: 'disability', width: 5.68 },
        { key: 'pwd', width: 6.25 },
        { key: 'Mother_name', width: 36.93 },
        { key: 'Mother_occupation', width: 29.54 },
        { key: 'Mother_address', width: 29.54 },
        { key: 'Mother_contact_number', width: 18.18 },
        { key: 'Father_name', width: 36.93 },
        { key: 'Father_occupation', width: 29.54 },
        { key: 'Father_address', width: 29.54 },
        { key: 'Father_contact_number', width: 18.18 },
        { key: 'Parents_solo_parent', width: 9.09 },
        { key: 'Guardian_name', width: 36.93 },
        { key: 'Guardian_occupation', width: 29.54 },
        { key: 'Guardian_address', width: 29.54 },
        { key: 'Guardian_contact_number', width: 18.18 },
        { key: 'Guardian_solo_parent', width: 9.09 },
        { key: 'remarks', width: 12.49 },
    ]
    const sy_cell = sheet.getCell('R10'),
        ln_cell = sheet.getCell('E11'),
        sy = school_year + '-' + (parseInt(school_year) + 1),
        pb_cell = sheet.getCell('E18')
    sy_cell.value = sy_cell.value + sy
    ln_cell.value = ln_cell.value + location_name
    pb_cell.value = pb_cell.value + staff_name
    //Row Height: 0.35" = 0.35 * 73.52525 = 25.73 = sheet.getRow(x).height = 6.24
    sheet.getRow(14).height = 51.46
    sheet.getRow(16).height = 25.73
    data.map((rowData, i) => {
        sheet.insertRow(16 + i, rowData, 'o+')
    })
    const xlsxFile =
            sy +
            '-' +
            location_number +
            '-Masterlist-' +
            session_number +
            '.xlsx',
        xlsxBuffer = await workbook.xlsx.writeBuffer(),
        file = new Blob([xlsxBuffer], { type: 'application/vnd.ms-excel' })
    return [file, xlsxFile]
}
export async function GradingSheetTemplateExcelFile_download(
    data,
    school_year,
    location_name,
    location_number,
    staff_name,
    session_number
) {
    const Excel = require('exceljs'),
        basePath = process.cwd() + '/public/faculty_portal',
        templateFile = basePath + '/template/Grading Sheet.xlsx',
        outputPath = basePath + '/download/grading_sheet',
        workbook = new Excel.Workbook()
    await workbook.xlsx.readFile(templateFile)
    const sheet = workbook.getWorksheet('Evaluation_Form')
    // Column Width 2.13" = 2.13 * 11.36363 = {width: 24.20}
    sheet.columns = [
        { key: 'No.', width: 5.11 },
        { key: 'last_name', width: 17.04 },
        { key: 'first_name', width: 17.04 },
        { key: 'middle_initial', width: 10.22 },
        { key: 'b', width: 6.25 },
        { key: 'g', width: 6.25 },
        { key: 'Age_in_months', width: 8.52 },
        { key: 'gross_motor_raw', width: 8.52 },
        { key: 'gross_motor_scaled', width: 8.52 },
        { key: 'gross_motor_interpret', width: 8.52 },
        { key: 'fine_motor_raw', width: 8.52 },
        { key: 'fine_motor_scaled', width: 8.52 },
        { key: 'fine_motor_interpret', width: 8.52 },
        { key: 'self_help_raw', width: 8.52 },
        { key: 'self_help_scaled', width: 8.52 },
        { key: 'self_help_interpret', width: 8.52 },
        { key: 'receptive_langauge_raw', width: 8.52 },
        { key: 'receptive_langauge_scaled', width: 8.52 },
        { key: 'receptive_langauge_interpret', width: 8.52 },
        { key: 'expressive_language_raw', width: 8.52 },
        { key: 'expressive_language_scaled', width: 8.52 },
        { key: 'expressive_language_interpret', width: 8.52 },
        { key: 'cognitive_raw', width: 8.52 },
        { key: 'cognitive_scaled', width: 8.52 },
        { key: 'cognitive_interpret', width: 8.52 },
        { key: 'social_emotional_raw', width: 8.52 },
        { key: 'social_emotional_scaled', width: 8.52 },
        { key: 'social_emotional_interpret', width: 8.52 },
        { key: 'sum_of_scaled_score', width: 8.52 },
        { key: 'sum_of_standard_score', width: 8.52 },
        { key: 'interpretation', width: 8.52 },
    ]
    const locname_cell = sheet.getCell('A8'),
        submitted_by_cell = sheet.getCell('B16'),
        sy = school_year + '-' + (parseInt(school_year) + 1) // eval_cell = sheet.getCell('L8'),
    // eval_cell.value = 'Period of Evaluation:  First ___ Second ___ Third ___'
    locname_cell.value = locname_cell.value + location_name
    submitted_by_cell.value = staff_name
    //Row Height: 0.35" = 0.35 * 73.52525 = 25.73 = sheet.getRow(x).height = 6.24
    // for (let i = 0; i < 6; i++) {
    //     sheet.getRow(19 + i).height = 13.23
    // }
    data.map((rowData, i) => {
        sheet.insertRow(12 + i, rowData, 'o+')
    })
    const xlsxFile =
            sy +
            '-' +
            location_number +
            '-Grading_Sheet-' +
            session_number +
            '.xlsx',
        xlsxBuffer = await workbook.xlsx.writeBuffer(),
        file = new Blob([xlsxBuffer], { type: 'application/vnd.ms-excel' })
    return [file, xlsxFile]
}
/*
// cell.alignment = {
    //     vertical: 'bottom',
    //     horizontal: 'left',
    // }
    // cell.font = { underline: true }
    // sheet.getCell('A1').value = { formula: '=IF(A1="","Null","Not Null")' }
    // cell.border = { bottom: { style: 'medium' } }
.alignment = {
            vertical: 'middle',
            horizontal: 'center',
        }
sheet.columns = [
        { key: 'no' },
        { key: 'b' },
        { key: 'g' },
        { key: 'surname' },
        { key: 'first_name' },
        { key: 'middle_name' },
        { key: 'date_of_birth' },
        { key: 'age' },
        { key: 'height_before' },
        { key: 'height_after' },
        { key: 'weight_before' },
        { key: 'weight_after' },
        { key: 'vit_a' },
        { key: 'deworming' },
        { key: '4ps' },
        { key: 'disability' },
        { key: 'pwd' },
        { key: 'parent' },
        { key: 'solo_parent' },
        { key: 'address' },
        { key: 'contact_number' },
        { key: 'remarks' },
    ]
const data = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ]
*/
