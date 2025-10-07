'use client'
import { done, inprogress, warning } from '@/components/WideStatusText'
import {
    GradingSheetTemplateExcelFile_download,
    MasterlistExcelFile_download,
} from '../../../app/_lib/excelDownload'
import { getSessionList } from './sessions'

const className = {
    button: 'border sm:mx-2 h-10 bg-blue-300 px-2 border-blue-500',
}
let data = null
export default function Controls() {
    return (
        <div className="mb-5 mt-4 text-black">
            <div className="mb-2 flex flex-wrap items-end">
                <button
                    className={'mx-auto' + ' ' + className.button}
                    onClick={DownloadMasterlist_onClick}
                >
                    Download Masterlist
                </button>
                <button
                    className={'mx-auto sm:ms-auto' + ' ' + className.button}
                    onClick={DownloadGradingSheet_onClick}
                >
                    Download Grading Sheet
                </button>
            </div>
        </div>
    )

    async function DownloadMasterlist_onClick() {
        inprogress('preparing masterlist sheet...')
        getData()
        // console.log(data)
        // return true
        if (data) {
            const download = document.createElement('a'),
                downloadLink = await MasterlistExcelFile_download(
                    data['list'],
                    data.school_year,
                    data.location_name,
                    data.location_number,
                    data.staff_name,
                    data.session_value
                )
            download.href = URL.createObjectURL(downloadLink[0])
            download.download = downloadLink[1]
            download.click()
            done('Download in started!', 1500)
            return true
        }
        warning('Failed to get file!', 1500)
    }
    async function DownloadGradingSheet_onClick() {
        inprogress('preparing grading sheet...')
        getData()
        if (data) {
            const download = document.createElement('a'),
                downloadLink = await GradingSheetTemplateExcelFile_download(
                    data['list'],
                    data.school_year,
                    data.location_name,
                    data.location_number,
                    data.staff_name,
                    data.session_value
                )
            download.href = URL.createObjectURL(downloadLink[0])
            download.download = downloadLink[1]
            download.click()
            done('Download in started!', 1500)
            return true
        }
        warning('Failed to get file!', 1500)
    }
    function getData() {
        data = null
        const masterlist = structuredClone(getSessionList())
        if (!masterlist) return false
        if (!masterlist['child_information']) return false
        const child_information = masterlist['child_information'],
            nutritional_status = masterlist['nutritional_status'],
            parents_information = masterlist['parents_information']
        for (let i = 0; i < child_information.length; i++) {
            if (child_information[i]['middle_name'])
                child_information[i]['middle_initial'] =
                    child_information[i]['middle_name'].substring(0, 1) + '.'
            if (child_information[i]['gender'] == 'male') {
                child_information[i]['b'] = '🗹'
            } else if (child_information[i]['gender'] == 'female') {
                child_information[i]['g'] = '🗹'
            }
            // delete child_information[i]['gender']
            Object.keys(nutritional_status[i]).forEach((key) => {
                if (key != 'registration_number')
                    child_information[i][key] = nutritional_status[i][key]
            })
            // console.log(parents_information)
            // return true
            for (let x = 0; x < parents_information[i].length; x++) {
                // console.log(x)
                const parent = parents_information[i][x],
                    [relationship, parent_name] = parent['name'].split(':'),
                    rttc =
                        relationship == 'Mother' || relationship == 'Father'
                            ? relationship
                            : 'Guardian',
                    name = parent_name.substring(1)
                child_information[i][rttc + '_name'] = name
                Object.keys(parent).forEach((key) => {
                    if (key != 'name' && key != 'registration_number')
                        child_information[i][rttc + '_' + key] = parent[key]
                })
                if (
                    child_information[i]['Father_solo_parent'] ||
                    child_information[i]['Mother_solo_parent']
                ) {
                    child_information[i]['Parents_solo_parent'] = '🗹'
                }
                delete child_information[i]['Father_solo_parent']
                delete child_information[i]['Mother_solo_parent']
            }
        }
        data = {}
        data['list'] = child_information
        data['school_year'] = masterlist['school_year']
        data['location_name'] = masterlist['location_name']
        data['location_number'] = masterlist['location_number']
        data['staff_name'] = masterlist['staff_name']
        data['session_value'] = masterlist['session_value']
    }
}

/*
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
function diff_months(dt2, dt1) {
    // Calculate the difference in milliseconds between the two dates.
    var diff = (dt2.getTime() - dt1.getTime()) / 1000
    // Convert the difference from milliseconds to months by dividing it by the number of milliseconds in an hour, a day, a week, and approximately 4 weeks in a month.
    diff /= 60 * 60 * 24 * 7 * 4
    // Round the result to the nearest integer using Math.round().
    return Math.abs(Math.round(diff))
}
const router = useRouter(),
        searchParams = useSearchParams(),
        createQueryString = useCallback(
            (name, value) => {
                const params = new URLSearchParams(searchParams)
                params.set(name, value)

                return params.toString()
            },
            [searchParams]
        )


function ViewProfile_onClick() {
        const id = getCookie('selected_cell')
        if (id) {
            router.push(
                '/faculty-portal/registration-form' +
                    '?' +
                    createQueryString('reg_no', id) +
                    '&' +
                    createQueryString('prev', 'true')
            )
        }
    }
function Upload_onClick() {
        // evt.preventDefault()
        const excelFile = document.createElement('input')
        excelFile.type = 'file'
        excelFile.accept = '.xlsx'
        excelFile.click()
        excelFile.onchange = (e) => {
            console.log('excel is loaded')
        }
    }


<button
                    className={'mx-auto' + ' ' + className.button}
                    onClick={ViewProfile_onClick}
                >
                    View Profile
                </button>
<button
                    className={'sm:mt:0 mx-auto mt-5' + ' ' + className.button}
                    onClick={Upload_onClick}
                    type="file"
                    accept=".xlsx"
                >
                    Upload Scores
                </button>
*/
