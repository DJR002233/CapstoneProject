'use client'
import Image from 'next/image'
import ChildInformation from '@/components/child-information'
import FamilyInformation from '@/components/family-information'
import SiblingsInformation from '@/components/siblings-information'
import { useState } from 'react'
import { sendRegistration_formdata } from '@/app/_lib/fetch'
import { useRouter } from 'next/navigation'

const formdata = new FormData(),
    year = new Date().getFullYear()
let location_number = null

export default function Form({ location_id, location_name }) {
    location_number = location_id
    const router = useRouter()
    const [errorMessage, seterrorMessage] = useState({
        className: '',
        innerText: '',
    })
    const [picture, setpicture] = useState(
        '/pictures/registration-form/placeholder_child_picture.jpg'
    )
    return (
        <>
            <form id="main_reg_form">
                <div className="my-16 me-32 flex items-center text-center sm:my-20 sm:me-20 md:me-0">
                    <strong className="w-full">
                        <p className="mx-auto w-2/5 border-2 pb-3">
                            REGISTRATION (INTAKE) FORM
                            <br />
                            SCHOOL YEAR: {year}
                        </p>
                        <p className="mx-auto mt-2 w-2/5 border-2 pb-3">
                            {location_name}
                            <br />
                            Child Development Center
                        </p>
                    </strong>
                    <div className="absolute right-5 md:right-14 lg:right-24 xl:right-40 2xl:right-52">
                        <Image
                            className="bg-slate-500"
                            src={picture}
                            width={180}
                            height={180}
                            placeholder="blur"
                            quality={30}
                            blurDataURL="none"
                            alt="2x2 Picture"
                        />
                        <button
                            onClick={addPicture}
                            type="button"
                            className="mt-1 w-full rounded-md border-4 border-blue-400 bg-blue-500 py-1 text-white"
                        >
                            Upload Picture
                        </button>
                    </div>
                </div>
                <ChildInformation />
                <p className="mt-16 text-sm text-red-500">
                    at least 1 parent or guardian is required*
                </p>
                <p className="mb-5 w-full text-center text-2xl">
                    <strong>FAMILY BACKGROUND</strong>
                </p>
                <p className="mt-8 text-sm text-red-500 2xl:mt-0">
                    leave the name blank to exclude
                </p>
                <div className="flex flex-col gap-x-3 gap-y-3 2xl:flex-row">
                    <FamilyInformation title="FATHER" relative="father" />
                    <FamilyInformation title="MOTHER" relative="mother" />
                </div>
                <p className="mt-8 text-sm text-red-500">
                    leave the name blank to exclude
                </p>
                <SiblingsInformation />
                <p className="mt-8 text-sm text-red-500">
                    leave the name blank to exclude
                </p>
                <FamilyInformation
                    title="GUARDIAN/CARE TAKER"
                    relative="guardian"
                />
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
                <div className="mx-auto mt-7 flex w-1/2">
                    <button
                        onClick={confirmInputs}
                        type="button"
                        className="mx-auto mt-3 w-9/12 max-w-xl rounded-md border-4 border-blue-600 bg-blue-600 px-3 py-3 text-white"
                    >
                        Confirm
                    </button>
                </div>
            </form>
            {/*hidden panel/**/}
            <div
                className="pointer-events-none fixed hidden h-0 w-0 overflow-x-hidden overflow-y-hidden opacity-0"
                id="confirmation"
            >
                <p className="text-center text-2xl font-bold">
                    Confirm Information
                </p>
                <p className="mt-2 text-lg font-bold">Child Information</p>
                <div className="flex bg-gray-200 px-8 py-4">
                    <table className="w-full table-fixed" id="confirm_child">
                        <tbody></tbody>
                    </table>
                </div>
                <p className="mt-4 text-center text-xl font-bold">
                    Family Background
                </p>
                <div className="hidden" id="father">
                    <p className="mt-3 text-lg font-bold">Father Information</p>
                    <table className="w-full table-fixed" id="confirm_father">
                        <tbody></tbody>
                    </table>
                </div>
                <div className="hidden bg-gray-200" id="mother">
                    <p className="mt-4 text-lg font-bold">Mother Information</p>
                    <table className="w-full table-fixed" id="confirm_mother">
                        <tbody></tbody>
                    </table>
                </div>
                <div className="hidden" id="siblings">
                    <p className="mt-4 text-lg font-bold">
                        siblings Information
                    </p>
                    <table className="w-full table-fixed" id="confirm_siblings">
                        <tbody></tbody>
                    </table>
                </div>
                <div className="hidden bg-gray-200" id="guardian">
                    <p className="mt-4 text-lg font-bold">
                        Guardian Information
                    </p>
                    <table className="w-full table-fixed" id="confirm_guardian">
                        <tbody></tbody>
                    </table>
                </div>

                <div className="mt-4 flex w-full flex-wrap">
                    <button
                        onClick={close_confirmation}
                        type="button"
                        className="mx-auto mt-3 w-1/4 rounded-md border-4 border-blue-600 bg-blue-600 px-3 py-2 text-white"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={submit}
                        type="button"
                        className="mx-auto mt-3 w-1/4 rounded-md border-4 border-blue-600 bg-blue-600 px-3 py-2 text-white"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
    async function submit() {
        if (!formdata.has('picture')) return false
        if (!formdata.get('childInformation')) return false
        if (!formdata.get('parentsInformation')) return false
        if (!formdata.get('siblingsInformation')) return false
        // alert('Passed')
        // return true
        const response = await sendRegistration_formdata(formdata)
        if (response) {
            alert(
                'Registered Successfully!\n\nYou will now be redirected back to home page'
            )
            router.push('/available-locations')
            return true
        }
        alert('something went wrong\n\nPlease contact tech support')
        router.replace('/')
        return false
    }
    function close_confirmation() {
        // if (!formdata.has('picture')) formdata.delete('picture')
        if (formdata.get('childInformation'))
            formdata.delete('childInformation')
        if (formdata.get('parentsInformation'))
            formdata.delete('parentsInformation')
        if (formdata.get('siblingsInformation'))
            formdata.delete('siblingsInformation')
        const main_div = document.getElementById('main_reg_form'),
            confirmation_div = document.getElementById('confirmation'),
            confirm_child = document
                .getElementById('confirm_child')
                .getElementsByTagName('tbody')[0],
            father = document.getElementById('father'),
            confirm_father = document
                .getElementById('confirm_father')
                .getElementsByTagName('tbody')[0],
            mother = document.getElementById('mother'),
            confirm_mother = document
                .getElementById('confirm_mother')
                .getElementsByTagName('tbody')[0],
            siblings = document.getElementById('siblings'),
            confirm_siblings = document
                .getElementById('confirm_siblings')
                .getElementsByTagName('tbody')[0],
            guardian = document.getElementById('guardian'),
            confirm_guardian = document
                .getElementById('confirm_guardian')
                .getElementsByTagName('tbody')[0]
        confirm_child.innerHTML = ''
        confirm_father.innerHTML = ''
        confirm_mother.innerHTML = ''
        confirm_siblings.innerHTML = ''
        confirm_guardian.innerHTML = ''
        father.className = 'hidden'
        mother.className = 'hidden'
        siblings.className = 'hidden'
        guardian.className = 'hidden'
        main_div.className = ''
        confirmation_div.className =
            'h-0 fixed w-0 overflow-y-hidden overflow-x-hidden' +
            ' ' +
            'hidden opacity-0 pointer-events-none'
        return true
    }
    function confirmInputs() {
        seterrorMessage({
            className: '',
            innerText: '',
        })
        const childInformation = getChildInformation(),
            parentsInformation = [],
            siblingsInformation = getSiblingsInformation(),
            father = getParentInformation(1),
            mother = getParentInformation(0),
            guardian = getGuardianInformation()
        let hasParent = false

        if (childInformation.status == 'Error') {
            seterrorMessage({
                className:
                    'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                innerText: childInformation.message,
            })
            return false
        } /**/

        if (!formdata.has('picture')) {
            seterrorMessage({
                className:
                    'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                innerText: 'Please add child 2x2 picture',
            })
            return false
        } /**/
        {
            if (
                document
                    .getElementById('father_information')
                    .getElementsByTagName('input')[0].value &&
                document
                    .getElementById('father_information')
                    .getElementsByTagName('input')[1].value
            ) {
                if (father.status == 'Error') {
                    seterrorMessage({
                        className:
                            'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                        innerText: father.message,
                    })
                    return false
                }
                parentsInformation.push(father)
                hasParent = true
            }
        }
        {
            if (
                document
                    .getElementById('mother_information')
                    .getElementsByTagName('input')[0].value &&
                document
                    .getElementById('mother_information')
                    .getElementsByTagName('input')[1].value
            ) {
                if (mother.status == 'Error') {
                    seterrorMessage({
                        className:
                            'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                        innerText: mother.message,
                    })
                    return false
                }
                parentsInformation.push(mother)
                hasParent = true
            }
        }
        if (siblingsInformation.status == 'Error') {
            seterrorMessage({
                className:
                    'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                innerText: siblingsInformation.message,
            })
            return false
        }
        {
            if (
                document
                    .getElementById('guardian_information')
                    .getElementsByTagName('input')[0].value &&
                document
                    .getElementById('guardian_information')
                    .getElementsByTagName('input')[1].value
            ) {
                if (guardian.status == 'Error') {
                    seterrorMessage({
                        className:
                            'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
                        innerText: guardian.message,
                    })
                    return false
                }
                parentsInformation.push(guardian)
                hasParent = true
            }
        }
        if (hasParent) {
            formdata.append(
                'childInformation',
                JSON.stringify(childInformation)
            )
            formdata.append(
                'parentsInformation',
                JSON.stringify(parentsInformation)
            )
            formdata.append(
                'siblingsInformation',
                JSON.stringify(siblingsInformation)
            )
            const main_div = document.getElementById('main_reg_form'),
                confirmation_div = document.getElementById('confirmation'),
                confirm_child = document
                    .getElementById('confirm_child')
                    .getElementsByTagName('tbody')[0],
                father = document.getElementById('father'),
                confirm_father = document
                    .getElementById('confirm_father')
                    .getElementsByTagName('tbody')[0],
                mother = document.getElementById('mother'),
                confirm_mother = document
                    .getElementById('confirm_mother')
                    .getElementsByTagName('tbody')[0],
                siblings = document.getElementById('siblings'),
                confirm_siblings = document
                    .getElementById('confirm_siblings')
                    .getElementsByTagName('tbody')[0],
                guardian = document.getElementById('guardian'),
                confirm_guardian = document
                    .getElementById('confirm_guardian')
                    .getElementsByTagName('tbody')[0]
            let row, cell
            main_div.className = 'opacity-50 pointer-events-none'
            confirmation_div.className =
                'max-h-screen-95 fixed left-1/2 top-1/2 flex w-11/12 -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto border-2 border-slate-500 bg-slate-100 px-4 pb-8 pt-4 lg:w-9/12'
            const ci = Object.assign(
                    {},
                    childInformation['ci_info'],
                    childInformation['ns']
                ),
                labels = [
                    'Last Name:',
                    'First Name:',
                    'Middle Name:',
                    'Suffix:',
                    'Nickname:',
                    'Gender:',
                    'Date of Birth:',
                    'Place of Birth:',
                    'Age:',
                    'Address:',
                    'Barangay:',
                    'Contact Number:',
                    'Religion:',
                    'PWD:',
                    'PWD Number:',
                    'With Special Needs:',
                    'Diagnosis:',
                    'With Medical Record:',
                    '4Ps Member:',
                    '4Ps Reference Number:',
                    'Nutritional Status:',
                    'Weight:',
                    'Height:',
                    'Date of Last Deworming:',
                    'Date of Last Vitamin A Intake:',
                    'With Birth Certificate:',
                    'With Health Records:',
                    'No Requirements:',
                ],
                keys = [
                    'last_name',
                    'first_name',
                    'middle_name',
                    'suffix',
                    'nickname',
                    'gender',
                    'date_of_birth',
                    'place_of_birth',
                    'age',
                    'address',
                    'barangay',
                    'contact_number',
                    'religion',
                    'pwd',
                    'pwd_number',
                    'with_special_needs',
                    'medical_diagnosis',
                    'with_medical_record',
                    '4ps_member',
                    '4ps_reference_number',
                    'nutritional_status',
                    'weight',
                    'height',
                    'date_of_last_deworming',
                    'date_of_last_vitamin_a_intake',
                    'birth_certificate',
                    'health_records',
                    'no_requirements',
                ]
            if (ci['pwd_number']) {
                ci['pwd'] = 'Yes'
            } else {
                ci['pwd'] = 'No'
                ci['pwd_number'] = ''
            }
            if (ci['medical_diagnosis']) {
                ci['with_special_needs'] = 'Yes'
            } else {
                ci['with_special_needs'] = 'No'
                ci['medical_diagnosis'] = ''
                ci['with_medical_record'] = ''
            }
            if (ci['4ps_reference_number']) {
                ci['4ps_member'] = 'Yes'
            } else {
                ci['4ps_member'] = 'No'
                ci['4ps_reference_number'] = ''
            }
            ci['nutritional_status'] = ''
            const wh = JSON.parse(ci['upon_entry'])
            ci['weight'] = wh['weight']
            ci['height'] = wh['height']
            if (ci['birth_certificate']) {
                ci['birth_certificate'] = 'Checked'
            } else ci['birth_certificate'] = 'Unchecked'
            if (ci['health_records']) {
                ci['health_records'] = 'Checked'
            } else ci['health_records'] = 'Unchecked'
            if (ci['no_requirements']) {
                ci['no_requirements'] = 'Checked'
            } else ci['no_requirements'] = 'Unchecked'
            confirm_child.innerHTML = ''
            formatter(confirm_child, labels, keys, ci)
            const pi = parentsInformation,
                parent_labels = [
                    'Last Name:',
                    'First Name:',
                    'Middle Name:',
                    'Address:',
                    'Contact Number:',
                    'Date of Birth:',
                    'Educational Attainment:',
                    'Civil Status:',
                    'Occupation:',
                    'Business Address:',
                    'Registered Voter of Muntinlupa:',
                    'Precinct Number:',
                    'Barangay:',
                    'Tupad Beneficiary:',
                    'Tupad Beneficiary Year:',
                    'Category:',
                    'PWD:',
                    'PWD Number:',
                ],
                parents_keys = [
                    'last_name',
                    'first_name',
                    'middle_name',
                    'address',
                    'contact_number',
                    'date_of_birth',
                    'educational_attainment',
                    'civil_status',
                    'occupation',
                    'business_address',
                    'registered_voter_of_muntinlupa',
                    'precinct_number',
                    'barangay',
                    'tupad_beneficiary',
                    'tupad_beneficiary_year',
                    'category',
                    'pwd',
                    'pwd_number',
                ],
                guardian_keys = [
                    'last_name',
                    'first_name',
                    'middle_name',
                    'relationship_to_the_child',
                    'address',
                    'contact_number',
                    'date_of_birth',
                    'age',
                    'sex',
                    'educational_attainment',
                    'civil_status',
                    'occupation',
                    'business_address',
                    'registered_voter_of_muntinlupa',
                    'precinct_number',
                    'barangay',
                    'tupad_beneficiary',
                    'tupad_beneficiary_year',
                    'category',
                    'pwd',
                    'pwd_number',
                ],
                guardian_labels = [
                    'Last Name:',
                    'First Name:',
                    'Middle Name:',
                    'Relationship to the Child:',
                    'Address:',
                    'Contact Number:',
                    'Date of Birth:',
                    'Age',
                    'Sex',
                    'Educational Attainment:',
                    'Civil Status:',
                    'Occupation:',
                    'Business Address:',
                    'Registered Voter of Muntinlupa:',
                    'Precinct Number:',
                    'Barangay:',
                    'Tupad Beneficiary:',
                    'Tupad Beneficiary Year:',
                    'Category:',
                    'PWD:',
                    'PWD Number:',
                ]
            father.className = 'hidden'
            confirm_father.innerHTML = ''
            mother.className = 'hidden'
            confirm_mother.innerHTML = ''
            guardian.className = 'hidden'
            confirm_guardian.innerHTML = ''
            for (let i = 0; i < pi.length; i++) {
                const mem = pi[i]
                if (mem['precinct_number'] && mem['barangay']) {
                    mem['registered_voter_of_muntinlupa'] = 'Yes'
                } else {
                    mem['registered_voter_of_muntinlupa'] = 'No'
                    mem['precinct_number'] = ''
                    mem['barangay'] = ''
                }
                if (mem['tupad_beneficiary_year']) {
                    mem['tupad_beneficiary'] = 'Yes'
                } else {
                    mem['tupad_beneficiary'] = 'Yes'
                    mem['tupad_beneficiary_year'] = ''
                }
                if (mem['pwd_number']) {
                    mem['pwd'] = 'Yes'
                } else {
                    mem['pwd'] = 'No'
                    mem['pwd_number'] = ''
                }
                if (mem['relationship_to_the_child'] == 'Father') {
                    father.className = ''
                    formatter(
                        confirm_father,
                        parent_labels,
                        parents_keys,
                        pi[i]
                    )
                } else if (mem['relationship_to_the_child'] == 'Mother') {
                    mother.className = ''
                    formatter(
                        confirm_mother,
                        parent_labels,
                        parents_keys,
                        pi[i]
                    )
                } else {
                    guardian.className = ''
                    formatter(
                        confirm_guardian,
                        guardian_labels,
                        guardian_keys,
                        pi[i]
                    )
                }
            }

            const si = siblingsInformation,
                siblings_label = [
                    'Name:',
                    'Date of Birth:',
                    'Age:',
                    'Grade / Level',
                ],
                siblings_keys = ['name', 'date_of_birth', 'age', 'grade_level']
            siblings.className = 'hidden'
            confirm_siblings.innerHTML = ''
            if (si.length > 0) {
                siblings.className = ''
                for (let i = 0; i < si.length; i++) {
                    row = confirm_siblings.insertRow(-1)
                    // row.className = 'border-y border-black'
                    cell = row.insertCell(-1)
                    cell.className = 'font-bold'
                    cell.innerText = 'Sibling Number ' + (i + 1)
                    formatter(
                        confirm_siblings,
                        siblings_label,
                        siblings_keys,
                        si[i]
                    )
                }
            }
            return true
            function formatter(
                tbody = {},
                set_labels = [],
                set_keys = [],
                data = {}
            ) {
                if (typeof tbody != 'object') return false
                if (Object.keys(tbody) <= 0) return false
                for (let x = 0; x < set_labels.length; x++) {
                    row = tbody.insertRow(-1)
                    row.className = 'border-y border-black'

                    cell = row.insertCell(-1)
                    // cell.className = 'break-all max-w-fit'
                    cell.innerText = set_labels[x]
                    cell = row.insertCell(-1)
                    cell.className = 'break-all'
                    cell.innerText = data[set_keys[x]]
                }
            }
        }
        seterrorMessage({
            className:
                'mx-auto mt-3 flex w-1/2 flex-wrap items-center border-2 border-red-400 bg-red-300 py-2 text-center',
            innerText: 'Please add at least 1 parent or guardian information',
        })
        return false
    }
    function addPicture() {
        const picture = document.createElement('input')
        picture.type = 'file'
        picture.accept = '.png,.jpeg,.jpg,image/png,image/jpeg'
        picture.click()
        picture.onchange = (e) => {
            formdata.append('picture', e.target.files[0])
            setpicture(URL.createObjectURL(e.target.files[0]))
        }
    }
} /**/
function getChildInformation() {
    if (!location_number) return false
    const keys = [],
        data = { ci_info: {}, ns: {} },
        ci_form = document
            .getElementById('child_information')
            .getElementsByTagName('input')
    data.ci_info['development_center_location'] = location_number
    const datetime = new Date(),
        month = datetime.getMonth(),
        day = datetime.getDate(),
        year = datetime.getFullYear(),
        date = new Date(year + '-' + (month + 1) + '-' + day),
        set_date = new Date(ci_form[7].value)
    if (set_date > datetime) {
        alert('Please input a valid child date of birth')
        return {
            status: 'Error',
            message: 'Invalid child date of birth',
        }
    }
    if (
        diff_months(date, set_date) > 60 ||
        (diff_months(date, set_date) == 60 &&
            set_date.getDate() <= date.getDate()) ||
        ci_form[9].value >= 5
    ) {
        alert(
            'Sorry Registration Failed!\nChild ages 0 - 4 are only applicable to register in the development centers'
        )
        return {
            status: 'Error',
            message: 'Child is not applicable to register',
        }
    }
    for (let i = 0; i < 14; i++) {
        const inputType = ci_form[i].type
        if (inputType == 'text' || inputType == 'number' || inputType == 'date')
            if (!ci_form[i].value && i != 2 && i != 3 && i != 4)
                return {
                    status: 'Error',
                    message: 'Missing Child ' + ci_form[i].id,
                }
        if (
            (ci_form[i].id == 'contact_number' &&
                Number.isNaN(parseInt(ci_form[i].value))) ||
            (ci_form[i].id == 'contact_number' &&
                (parseInt(ci_form[i].value).toString().length < 10 ||
                    parseInt(ci_form[i].value).toString().length > 12))
        )
            return {
                status: 'Error',
                message: 'Please enter a valid Child Contact Number',
            }
    }
    if (ci_form[3].value.length > 3) {
        return {
            status: 'Error',
            message: 'Child Suffix is too long',
        }
    }
    for (let i = 0; i < ci_form.length; i++) {
        const inputType = ci_form[i].type
        if (inputType == 'text' || inputType == 'number' || inputType == 'date')
            if (
                ci_form[i].id != 'upon_entry_height' &&
                ci_form[i].id != 'upon_entry_weight' &&
                ci_form[i].id != 'after_program_height' &&
                ci_form[i].id != 'after_program_height'
            )
                if (i >= 14 && i <= 28) {
                    data.ns[ci_form[i].id] = ci_form[i].value
                } else data.ci_info[ci_form[i].id] = ci_form[i].value
    }
    for (let i = 0; i < ci_form.length; i++) {
        const inputType = ci_form[i].type
        if (inputType == 'checkbox') {
            if (ci_form[i].checked)
                data.ci_info[ci_form[i].id] = ci_form[i].value
        }
    }
    if (document.getElementById('male').checked) {
        data.ci_info['gender'] = 'male'
    } else if (document.getElementById('female').checked) {
        data.ci_info['gender'] = 'female'
    } else {
        return { status: 'Error', message: 'Please choose child gender' }
    }
    if (document.getElementById('pwd_yes').checked) {
        if (!document.getElementById('pwd_number').value)
            return { status: 'Error', message: 'Missing Child PWD Number' }
    } else {
        delete data.ns['pwd_number']
    }
    data.ns['with_medical_record'] =
        document.getElementById('medical_record_yes').checked
    if (document.getElementById('special_needs_yes').checked) {
        if (!document.getElementById('medical_diagnosis').value)
            return { status: 'Error', message: 'Missing Child Diagnosis' }
    } else {
        delete data.ns['medical_diagnosis']
        delete data.ns['with_medical_record']
    }
    if (document.getElementById('4ps_member_yes').checked) {
        if (!document.getElementById('4ps_reference_number').value) {
            return {
                status: 'Error',
                message: 'Missing Child 4Ps Reference Number',
            }
        } else if (
            Number.isNaN(
                parseInt(document.getElementById('4ps_reference_number').value)
            ) &&
            parseInt(
                document.getElementById('4ps_reference_number').value
            ).toString().length <= 0
        ) {
            return {
                status: 'Error',
                message: 'Please enter a valid Child 4Ps Reference Number',
            }
        }
    } else {
        delete data.ns['4ps_reference_number']
    }
    const weight = document.getElementById('upon_entry_weight').value,
        height = document.getElementById('upon_entry_height').value
    if (weight && height) {
        data.ns['upon_entry'] = JSON.stringify({
            weight: weight,
            height: height,
        })
    } else {
        return { status: 'Error', message: 'Missing Child Weight or Height' }
    }
    return data
}
function getParentInformation(x = 0) {
    const parent = x == 1 ? 'father' : 'mother',
        pi_form = document
            .getElementById(parent + '_information')
            .getElementsByTagName('input'),
        data = {}
    if (x == 1) {
        data['relationship_to_the_child'] = 'Father'
    } else {
        data['relationship_to_the_child'] = 'Mother'
    }
    const datetime = new Date(),
        // month = datetime.getMonth(),
        // day = datetime.getDate(),
        // year = datetime.getFullYear(),
        // date = new Date(year + '-' + (month + 1) + '-' + day),
        set_date = new Date(pi_form[5].value)
    if (set_date > datetime) {
        alert('Please input a valid ' + parent + ' date of birth')
        return {
            status: 'Error',
            message: 'Invalid ' + parent + ' date of birth',
        }
    }
    /*
    if (
        diff_months(date, set_date) < 67 ||
        (diff_months(date, set_date) == 67 &&
            set_date.getDate() > date.getDate())
    ) {
        alert('')
        return {
            status: 'Error',
            message: '',
        }
    }/**/
    for (let i = 0; i < 17; i++) {
        const inputType = pi_form[i].type
        if (inputType == 'text' || inputType == 'number' || inputType == 'date')
            if (!pi_form[i].value && i != 2)
                return {
                    status: 'Error',
                    message: 'Missing ' + parent + ' ' + pi_form[i].id,
                }
        if (
            (pi_form[i].id == 'contact_number' &&
                Number.isNaN(parseInt(pi_form[i].value))) ||
            (pi_form[i].id == 'contact_number' &&
                (parseInt(pi_form[i].value).toString().length < 10 ||
                    parseInt(pi_form[i].value).toString().length > 12))
        )
            return {
                status: 'Error',
                message: 'Please enter a valid ' + parent + ' Contact Number',
            }
    }
    for (let i = 0; i < pi_form.length; i++) {
        const inputType = pi_form[i].type
        if (inputType == 'text' || inputType == 'number' || inputType == 'date')
            data[pi_form[i].id] = pi_form[i].value
    }
    if (pi_form[6].checked) {
        data['educational_attainment'] = pi_form[6].value
    } else if (pi_form[7].checked) {
        data['educational_attainment'] = pi_form[7].value
    } else if (pi_form[8].checked) {
        data['educational_attainment'] = pi_form[8].value
    } else if (pi_form[9].checked) {
        data['educational_attainment'] = pi_form[9].value
    } else {
        return {
            status: 'Error',
            message: 'Missing ' + parent + ' Educational Attainment',
        }
    }
    if (pi_form[10].checked) {
        data['civil_status'] = pi_form[10].value
    } else if (pi_form[11].checked) {
        data['civil_status'] = pi_form[11].value
    } else if (pi_form[12].checked) {
        data['civil_status'] = pi_form[12].value
    } else if (pi_form[13].checked) {
        data['civil_status'] = pi_form[13].value
    } else if (pi_form[14].checked) {
        data['civil_status'] = pi_form[14].value
    } else {
        return {
            status: 'Error',
            message: 'Missing ' + parent + ' Civil Status',
        }
    }
    if (pi_form[17].checked) {
        if (!pi_form[19].value)
            return {
                status: 'Error',
                message: 'Missing ' + parent + ' Precint Number',
            }
        if (!pi_form[20].value)
            return {
                status: 'Error',
                message: 'Missing ' + parent + ' Barangay',
            }
    } else {
        delete data['precint_number']
        delete data['barangay']
    }
    if (pi_form[21].checked) {
        if (!pi_form[23].value)
            return {
                status: 'Error',
                message:
                    'Missing ' + parent + ' TUPAD Beneficiary in What Year',
            }
    } else {
        delete data['tupad_beneficiary_year']
    }
    if (pi_form[24].checked) {
        data['category'] = pi_form[24].value
    } else if (pi_form[25].checked) {
        data['category'] = pi_form[25].value
    } else if (pi_form[26].checked) {
        data['category'] = pi_form[26].value
    } else {
        return {
            status: 'Error',
            message: 'Missing ' + parent + ' Category',
        }
    }
    if (pi_form[27].checked) {
        if (!pi_form[29].value)
            return {
                status: 'Error',
                message: 'Missing ' + parent + ' PWD Number',
            }
    } else {
        delete data['pwd_number']
    }
    return data
}
function getSiblingsInformation() {
    const sibling = [],
        tbody = document.getElementById('siblings_information').tBodies[0]
    for (let x = 0; x < tbody.rows.length; x++) {
        const row = tbody.rows[x],
            data = {}
        for (let i = 0; i < row.cells.length; i++) {
            const cell = row.cells[i].getElementsByTagName('input')[0]
            if (row.cells[0].getElementsByTagName('input')[0].value) {
                if (!cell.value)
                    return {
                        status: 'Error',
                        message: 'Missing sibling ' + cell.id,
                    }
                if (i == 1) {
                    const datetime = new Date(),
                        set_date = new Date(cell.value)
                    if (set_date > datetime) {
                        alert(
                            'Please input a valid sibling no. ' +
                                x +
                                ' date of birth'
                        )
                        return {
                            status: 'Error',
                            message:
                                'Invalid sibling no. ' + x + ' date of birth',
                        }
                    }
                }
                data[cell.id] = cell.value
            }
        }
        if (Object.keys(data).length > 0) sibling.push(data)
    }
    return sibling
}
function getGuardianInformation() {
    const g_form = document
            .getElementById('guardian_information')
            .getElementsByTagName('input'),
        data = {}
    const datetime = new Date(),
        // month = datetime.getMonth(),
        // day = datetime.getDate(),
        // year = datetime.getFullYear(),
        // date = new Date(year + '-' + (month + 1) + '-' + day),
        set_date = new Date(g_form[11].value)
    if (set_date > datetime) {
        alert('Please input a valid guardian date of birth')
        return {
            status: 'Error',
            message: 'Invalid guardian date of birth',
        }
    }
    /*
    if (
        diff_months(date, set_date) < 67 ||
        (diff_months(date, set_date) == 67 &&
            set_date.getDate() > date.getDate()) ||
        g_form[12].value < 5
    ) {
        alert('')
        return {
            status: 'Error',
            message: '',
        }
    }/**/
    for (let i = 0; i < 25; i++) {
        // console.log(i + ': ' + g_form.id)
        const inputType = g_form[i].type
        if (inputType == 'text' || inputType == 'number' || inputType == 'date')
            if (!g_form[i].value && i != 8 && i != 2)
                return {
                    status: 'Error',
                    message: 'Missing Guardian ' + g_form[i].id,
                }
        if (
            (g_form[i].id == 'contact_number' &&
                Number.isNaN(parseInt(g_form[i].value))) ||
            (g_form[i].id == 'contact_number' &&
                (parseInt(g_form[i].value).toString().length < 10 ||
                    parseInt(g_form[i].value).toString().length > 12))
        )
            return {
                status: 'Error',
                message: 'Please enter a valid Guardian Contact Number',
            }
    }
    for (let i = 0; i < g_form.length; i++) {
        const inputType = g_form[i].type
        if (inputType == 'text' || inputType == 'number' || inputType == 'date')
            if (i != 8) data[g_form[i].id] = g_form[i].value
    }
    if (g_form[3].checked) {
        data['relationship_to_the_child'] = g_form[3].value
    } else if (g_form[4].checked) {
        data['relationship_to_the_child'] = g_form[4].value
    } else if (g_form[5].checked) {
        data['relationship_to_the_child'] = g_form[5].value
    } else if (g_form[6].checked) {
        data['relationship_to_the_child'] = g_form[6].value
    } else if (g_form[7].checked) {
        if (g_form[8].value) {
            data['relationship_to_the_child'] = g_form[8].value
        } else {
            return {
                status: 'Error',
                message:
                    'Missing Guardian Relationship to the Child Others option',
            }
        }
    } else {
        return {
            status: 'Error',
            message: 'Missing Guardian Relationship to the Child',
        }
    }
    if (g_form[14].checked) {
        data['educational_attainment'] = g_form[14].value
    } else if (g_form[15].checked) {
        data['educational_attainment'] = g_form[15].value
    } else if (g_form[16].checked) {
        data['educational_attainment'] = g_form[16].value
    } else if (g_form[17].checked) {
        data['educational_attainment'] = g_form[17].value
    } else {
        return {
            status: 'Error',
            message: 'Missing Guardian Educational Attainment',
        }
    }
    if (g_form[18].checked) {
        data['civil_status'] = g_form[18].value
    } else if (g_form[19].checked) {
        data['civil_status'] = g_form[19].value
    } else if (g_form[20].checked) {
        data['civil_status'] = g_form[20].value
    } else if (g_form[21].checked) {
        data['civil_status'] = g_form[21].value
    } else if (g_form[22].checked) {
        data['civil_status'] = g_form[22].value
    } else {
        return {
            status: 'Error',
            message: 'Missing Guardian Civil Status',
        }
    }
    if (g_form[25].checked) {
        if (!g_form[27].value)
            return {
                status: 'Error',
                message: 'Missing Guardian Precint Number',
            }
        if (!g_form[28].value)
            return {
                status: 'Error',
                message: 'Missing Guardian Barangay',
            }
    } else {
        delete data['precint_number']
        delete data['barangay']
    }
    if (g_form[29].checked) {
        if (!g_form[31].value)
            return {
                status: 'Error',
                message: 'Missing Guardian TUPAD Beneficiary in What Year',
            }
    } else {
        delete data['tupad_beneficiary_year']
    }
    if (g_form[32].checked) {
        data['category'] = g_form[32].value
    } else if (g_form[33].checked) {
        data['category'] = g_form[33].value
    } else if (g_form[34].checked) {
        data['category'] = g_form[34].value
    } else if (g_form[35].checked) {
        data['category'] = g_form[35].value
    } else {
        return {
            status: 'Error',
            message: 'Missing Guardian Category',
        }
    }
    if (g_form[36].checked) {
        if (!g_form[38].value)
            return {
                status: 'Error',
                message: 'Missing Guardian PWD Number',
            }
    } else {
        delete data['pwd_number']
    }
    return data
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
