'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ChildInformation from '@/components/child-information'
import FamilyInformation from '@/components/family-information'
import SiblingsInformation from '@/components/siblings-information'
import { enroll_form, exclude_form } from '@/app/_lib/fetch'
import { useEffect, useState } from 'react'
import { done, inprogress, warning } from '@/components/WideStatusText'

export default function Form({
    data = { dev_center_location: '', parents_information: '' },
    profile_picture = null,
    redirect_link = '/faculty-portal',
}) {
    const router = useRouter()
    const child_information = structuredClone(data),
        parents_information = structuredClone(data.parents_information),
        siblings_information = structuredClone(data.siblings_information),
        [enroll_button, setenroll_button] = useState([]),
        [exclude_button, setexclude_button] = useState([]),
        [include_button, setinclude_button] = useState([])
    useEffect(() => {
        if (data.excluded) {
            setexclude_button([])
            setinclude_button([
                <button
                    id="include"
                    key={'include'}
                    onClick={Include_onClick}
                    type="button"
                    className={
                        'ms-2 mt-5 w-1/2 rounded-md border-4 border-blue-600 bg-blue-600 px-3 py-3 text-white'
                    }
                >
                    Include
                </button>,
            ])
        } else {
            setinclude_button([])
            setexclude_button([
                <button
                    id="exclude"
                    key="exclude"
                    onClick={Exclude_onClick}
                    type="button"
                    className={
                        'ms-2 mt-5 w-1/2 rounded-md border-4 border-blue-600 bg-blue-600 px-3 py-3 text-white'
                    }
                >
                    Exclude
                </button>,
            ])
        }
        if (!data.master_list) {
            setenroll_button([
                <button
                    id="enroll"
                    key="enroll"
                    onClick={Enroll_onClick}
                    type="button"
                    className={
                        'me-2 mt-5 w-1/2 rounded-md border-4 border-blue-600 bg-blue-600 px-3 py-3 text-white'
                    }
                >
                    Enroll
                </button>,
            ])
        } else {
            setenroll_button([])
        }
        if (data.archived) {
            setinclude_button([])
            setexclude_button([])
            setenroll_button([])
        }
    }, [])
    //child_information
    if (child_information) {
        delete child_information.parents_information
        delete child_information.development_center_location
        delete child_information.siblings_information
        delete child_information.registration_number_of_location
        delete child_information.picture
        delete child_information.created_at
        delete child_information.updated_at
        const ns = child_information.nutritional_status
        // console.log(ns)
        if (ns && typeof ns == 'object') {
            delete ns.created_at
            delete ns.updated_at
            if (ns.pwd_number) {
                child_information['pwd_number'] = ns.pwd_number
                child_information['pwd_yes'] = true
            } else {
                child_information['pwd_no'] = true
            }
            if (ns.medical_diagnosis) {
                child_information['medical_diagnosis'] = ns.medical_diagnosis
                if (ns.with_medical_record) {
                    child_information['medical_record_yes'] = true
                } else child_information['medical_record_no'] = true
                child_information['special_needs_yes'] = true
            } else {
                child_information['special_needs_no'] = true
            }
            if (ns['4ps_reference_number']) {
                child_information['4ps_reference_number'] =
                    ns['4ps_reference_number']
                child_information['fourps_member_yes'] = true
            } else {
                child_information['fourps_member_no'] = true
            }
            if (ns.after_program) {
                const after_program = JSON.parse(ns.after_program)
                child_information['after_program_weight'] = after_program.weight
                child_information['after_program_height'] = after_program.height
            }
            if (ns.upon_entry) {
                const upon_entry = JSON.parse(ns.upon_entry)
                child_information['upon_entry_weight'] = upon_entry.weight
                child_information['upon_entry_height'] = upon_entry.height
            }
            if (ns.date_of_last_deworming) {
                child_information['date_of_last_deworming'] =
                    ns.date_of_last_deworming
            }
            if (ns.date_of_last_vitamin_a_intake) {
                child_information['date_of_last_vitamin_a_intake'] =
                    ns.date_of_last_vitamin_a_intake
            }
        }
        delete child_information.nutritional_status
        if (child_information.gender == 'male') {
            child_information['male'] = true
        } else if (child_information.gender == 'female') {
            child_information['female'] = true
        }
        if (child_information.birth_certificate)
            child_information.birth_certificate = true
        if (child_information.health_records)
            child_information.health_records = true
        if (child_information.no_requirements)
            child_information.no_requirements = true
    }
    //parents_information
    let relative, pi
    for (let i = 0; i <= 2; i++) {
        if (parents_information && typeof parents_information == 'object') {
            pi = parents_information[i]
            if (!pi && typeof pi != 'object') {
                continue
            }
            delete pi.registration_number
            delete pi.updated_at
            delete pi.created_at
            const rttc = pi.relationship_to_the_child.toLowerCase(),
                ea = pi.educational_attainment.toLowerCase(),
                cs = pi.civil_status.toLowerCase(),
                c = pi.category.toLowerCase()
            if (rttc == 'mother' || rttc == 'father') {
                relative = rttc
            } else {
                relative = 'guardian'
            }
            changeKeyName(parents_information, relative, i)
            if (pi.precinct_number != null && pi.barangay != null) {
                pi['registered_voter_yes'] = true
            } else {
                pi['registered_voter_no'] = true
                delete pi.precinct_number
                delete pi.barangay
            }
            pi.tupad_beneficiary_year != null
                ? (pi['tupad_beneficiary_yes'] = true)
                : (pi['tupad_beneficiary_no'] = true)
            pi.pwd_number != null
                ? (pi['pwd_yes'] = true)
                : (pi['pwd_no'] = true)
            if (rttc == 'uncle') {
                pi['uncle'] = true
            } else if (rttc == 'aunt') {
                pi['aunt'] = true
            } else if (rttc == 'grandfather') {
                pi['grandfather'] = true
            } else if (rttc == 'grandmother') {
                pi['grandmother'] = true
            } else {
                pi['rttc_others'] = true
                pi['rttc_others_relative'] = rttc
            }
            if (ea == 'elementary') pi['elementary'] = true
            if (ea == 'high school') pi['high_school'] = true
            if (ea == 'tech/voc') pi['tech_voc'] = true
            if (ea == 'college') pi['college'] = true
            if (cs == 'single') pi['single'] = true
            if (cs == 'married') pi['married'] = true
            if (cs == 'widowed') pi['widowed'] = true
            if (cs == 'legally separated') pi['legally_separated'] = true
            if (cs == 'divorced') pi['divorced'] = true
            if (c == 'undernourished child') pi['undernourished_child'] = true
            if (c == 'solo parent') pi['solo_parent'] = true
            if (c == 'unemployed') pi['unemployed'] = true
            if (c == 'others') pi['category_others'] = true
            delete parents_information[i]
        }
    }
    //siblings_information
    let sb
    for (let i = 0; i <= 2; i++) {
        if (
            siblings_information != null &&
            typeof siblings_information == 'object'
        ) {
            sb = siblings_information[i]
            if ((sb == null || sb == undefined) && typeof sb != 'object') {
                continue
            }
            delete sb.id
            delete sb.registration_number
            delete sb.updated_at
            delete sb.created_at
            siblings_information['sibling_' + (i + 1) + '_name'] = sb.name
            siblings_information['sibling_' + (i + 1) + '_date_of_birth'] =
                sb.date_of_birth
            siblings_information['sibling_' + (i + 1) + '_age'] = sb.age
            siblings_information['sibling_' + (i + 1) + '_grade_level'] =
                sb.grade_level
            delete siblings_information[i]
        }
    }
    let picture = '/pictures/registration-form/placeholder_child_picture.jpg'
    if (profile_picture) picture = profile_picture
    return (
        <div className="text-black">
            <form>
                <div className="my-16 me-32 flex items-center text-center sm:my-20 sm:me-20 md:me-0">
                    <strong className="w-full">
                        <p className="mx-auto w-2/5 border-2 pb-3">
                            REGISTRATION (INTAKE) FORM
                            <br />
                            SCHOOL YEAR: {child_information.school_year}
                        </p>
                        <p className="mx-auto mt-2 w-2/5 border-2 pb-3">
                            {
                                child_information.dev_center_location
                                    .location_name
                            }
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
                            quality={0}
                            blurDataURL="none"
                            alt="2x2 Picture"
                        />
                    </div>
                </div>
                <ChildInformation
                    staffView={true}
                    defaultValue={child_information}
                />

                <p className="mb-5 mt-20 w-full text-center text-2xl">
                    <strong>FAMILY BACKGROUND</strong>
                </p>
                <div className="mb-10 flex flex-col gap-x-3 gap-y-3 2xl:flex-row">
                    <FamilyInformation
                        staffView={true}
                        title="FATHER"
                        relative="father"
                        defaultValue={parents_information.father}
                    />
                    <FamilyInformation
                        staffView={true}
                        title="MOTHER"
                        relative="mother"
                        defaultValue={parents_information.mother}
                    />
                </div>
                <SiblingsInformation
                    staffView={true}
                    defaultValue={siblings_information}
                />
                <br />
                <br />
                <FamilyInformation
                    staffView={true}
                    title="GUARDIAN/CARE TAKER"
                    relative="guardian"
                    defaultValue={parents_information.guardian}
                />
                <div id="buttons" className="flex w-full px-10">
                    {enroll_button}
                    {exclude_button}
                    {include_button}
                </div>
            </form>
        </div>
    )
    async function Enroll_onClick() {
        inprogress('Enrolling...')
        if (await enroll_fetch(child_information.registration_number)) {
            alert(
                'Enrolled Successfully!\n\nPress ok to go back to registration forms...'
            )
            done('Redirecting...')
            router.push(redirect_link + '/registration-forms')
            return true
        }
        warning('Failed to Enroll!', 1500)
    }
    async function Exclude_onClick() {
        inprogress('Excluding...')
        if (await exclude_fetch(child_information.registration_number, 1)) {
            alert(
                'Excluded Successfully!\n\nPress ok to go back to registration forms...'
            )
            done('Redirecting...')
            router.push(redirect_link + '/registration-forms')
            return true
        }
        warning('Failed to Enroll!', 1500)
    }
    async function Include_onClick() {
        inprogress('Including...')
        if (await exclude_fetch(child_information.registration_number, 0)) {
            alert(
                'Included Successfully!\n\nPress ok to go back to registration forms...'
            )
            done('Redirecting...')
            router.push(redirect_link + '/registration-forms')
            return true
        }
        warning('Failed to Enroll!', 1500)
    }
    function changeKeyName(collection, newKey, oldKey) {
        Object.defineProperty(
            collection,
            newKey,
            Object.getOwnPropertyDescriptor(collection, oldKey)
        )
        delete collection[oldKey]
    }
}
async function exclude_fetch(id, exclude) {
    const res = await exclude_form(id, exclude)
    return res
}
async function enroll_fetch(id) {
    const res = await enroll_form(id)
    return res
}
/*
if (child_information.nutritional_status.time_state == 'Upon Entry') {
            delete child_information.nutritional_status.time_state
            const x = structuredClone(child_information.nutritional_status)
            child_information.nutritional_status['before'] = x
            delete child_information.nutritional_status.height_length_cm
            delete child_information.nutritional_status.weight_kg
        } else if (
            child_information.nutritional_status.time_state[0] == 'Upon Entry'
        ) {
            Object.defineProperty(
                child_information.nutritional_status,
                'before',
                Object.getOwnPropertyDescriptor(
                    child_information.nutritional_status,
                    0
                )
            )
            delete child_information.nutritional_status[0]
        } else if (
            child_information.nutritional_status.time_state[1] == 'Upon Entry'
        ) {
            Object.defineProperty(
                child_information.nutritional_status,
                'before',
                Object.getOwnPropertyDescriptor(
                    child_information.nutritional_status,
                    1
                )
            )
            delete child_information.nutritional_status[1]
        }
        if (
            child_information.nutritional_status.time_state == 'After Program'
        ) {
            delete child_information.nutritional_status.time_state
            const x = structuredClone(child_information.nutritional_status)
            child_information.nutritional_status['after'] = x
            delete child_information.nutritional_status.height_length_cm
            delete child_information.nutritional_status.weight_kg
        } else if (
            child_information.nutritional_status.time_state[0] ==
            'After Program'
        ) {
            Object.defineProperty(
                child_information.nutritional_status,
                'after',
                Object.getOwnPropertyDescriptor(
                    child_information.nutritional_status,
                    0
                )
            )
            delete child_information.nutritional_status[0]
        } else if (
            child_information.nutritional_status.time_state[1] ==
            'After Program'
        ) {
            Object.defineProperty(
                child_information.nutritional_status,
                'after',
                Object.getOwnPropertyDescriptor(
                    child_information.nutritional_status,
                    1
                )
            )
            delete child_information.nutritional_status[1]
        }
/**/
