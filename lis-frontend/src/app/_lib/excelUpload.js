'use server'

import { uploadSession_Grades } from '@/app/_lib/fetch'
import { getLocationCookies } from './cookies'

export async function GradingSheetExcelFile_upload(
    xlsxFile,
    session_list,
    session_number
) {
    if (!session_number)
        return {
            status: 'Error',
            message: 'session_number is null or undefined. please refresh page',
        }
    const Excel = require('exceljs'),
        workbook = new Excel.Workbook()
    await workbook.xlsx.load(await xlsxFile.get('xlsxFile').arrayBuffer())
    const sheet = workbook.getWorksheet('Evaluation_Form')
    if (!sheet)
        return {
            status: 'Error',
            message:
                'please make sure the excel sheet is in correct format and correct sheet name (Evaluation_Form)',
        }
    // Column Width 2.13" = 2.13 * 11.36363 = {width: 24.20}
    /*
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
    ]/**/
    const obj = {},
        res = {},
        keys = [
            'last_name',
            'first_name',
            'middle_initial',
            'gross_motor',
            'fine_motor',
            'self-help',
            'receptive_language',
            'expressive_language',
            'cognitive',
            'social-emotional',
            'sum_of_scaled_score',
            'sum_of_standard_score',
            'interpretation',
        ],
        objkeys = ['raw', 'scaled', 'interpret'],
        columns = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            'AA',
            'AB',
            'AC',
            'AD',
            'AE',
        ]
    for (let rowIndex = 12; rowIndex < session_list.length + 12; rowIndex++) {
        const row = sheet.getRow(rowIndex),
            arr = {}
        // arr.push() name
        for (let colIndex = 2; colIndex <= 4; colIndex++) {
            const cellValue = row.getCell(colIndex).value,
                session_index = session_list[rowIndex - 12][keys[colIndex - 2]]
            if (cellValue != session_index) {
                if (
                    colIndex == 4 &&
                    cellValue.substring(0, 1) + '.' == cellValue
                ) {
                } else {
                    res['status'] = 'Error'
                    res['message'] =
                        'the grading sheet is not from the same session, wrong file, or has incorrect format'
                    return res
                }
            }
        }
        arr['registration_number'] =
            session_list[rowIndex - 12]['registration_number']
        let colIndex = 8,
            i = 3
        while (colIndex <= 30) {
            const objarr = {}
            if (colIndex <= 28) {
                for (let x = 0; x < 3; x++) {
                    const cellValue = row.getCell(colIndex + x).value
                    let end = false
                    if (typeof cellValue != 'number' && x < 2) end = true
                    if (typeof cellValue != 'string' && x == 2) end = true
                    if (end) {
                        res['status'] = 'Error'
                        res['message'] =
                            'cell ' +
                            columns[colIndex + x - 1] +
                            rowIndex +
                            ' has wrong type of data'
                        return res
                    }
                    objarr[objkeys[x]] = cellValue
                }
                arr[keys[i]] = JSON.stringify(objarr)
            }
            if (colIndex == 29)
                for (let x = 0; x < 3; x++) {
                    const cellValue = row.getCell(colIndex + x).value
                    let end = false
                    if (typeof cellValue != 'number' && x < 2) end = true
                    if (typeof cellValue != 'string' && x == 2) end = true
                    if (end) {
                        res['status'] = 'Error'
                        res['message'] =
                            'cell ' +
                            columns[colIndex + x - 1] +
                            rowIndex +
                            ' has wrong type of data'
                        return res
                    }
                    arr[keys[i + x]] = row.getCell(colIndex + x).value
                }
            colIndex += 3
            i++
        }
        obj[rowIndex - 12] = arr
    }

    const response = await uploadSession_Grades(
        session_number,
        obj,
        await getLocationCookies()
    )

    // return response

    if (response.status == 'Error') {
        return {
            status: 'Error',
            message: response.message,
        }
    } else if (response.status == 'success') {
        return {
            status: 'success',
            message: 'saved successfully',
            server_response: response,
        }
    } else {
        return {
            status: 'Error',
            message:
                'something went wrong! Please contact tech support Error_Code: BE1',
            server_response: response,
        }
    }
}

/*
const Excel = require('exceljs'),
        basePath = process.cwd() + '/public/faculty_portal',
        templateFile = basePath + '/template/Grading Sheet.xlsx',
        outputPath = basePath + '/download/grading_sheet',
        workbook = new Excel.Workbook()


const locname_cell = sheet.getCell('A8'),
        submitted_by_cell = sheet.getCell('B16'),
        sy = school_year + ' - ' + (parseInt(school_year) + 1) // eval_cell = sheet.getCell('L8'),
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
    const fs = require('fs'),
        xlsxPath = outputPath + '/' + location_number,
        xlsxFile =
            '/' +
            sy +
            '-' +
            location_number +
            '-Grading_Sheet-' +
            session_number +
            '.xlsx',
        downloadLink =
            '/faculty_portal/download/grading_sheet/' +
            location_number +
            '/' +
            xlsxFile
    if (!fs.existsSync(xlsxPath)) {
        fs.mkdirSync(xlsxPath)
    }
    await workbook.xlsx.writeFile(xlsxPath + xlsxFile)
    return downloadLink
*/
