import {
    TextBox,
    CheckBox,
    DateTimePicker,
    NumericUpDown,
    RadioButton,
} from '@/app/_lib/form-html'
const className = {
    global_css: 'flex mt-5',
    div: 'border-b-2 pb-5',
    textbox: 'me-5 border-b border-black',
    radiobutton: 'me-2',
    numericupdown: 'me-5 border-b border-black text-center',
    datetimepicker: 'me-5 border-b border-black',
    checkbox: 'me-2',
    label: 'me-2',
}
export default function ChildInformation({
    staffView = false,
    defaultValue = {},
}) {
    const div_j = []
    if (staffView) {
        div_j.push(
            <div key="key" id="j" className={'2xl:flex' + ' ' + className.div}>
                <label className={className.label + 'mt-5'}>
                    Nutritional Status After 120-Day Supplementary Feeding
                    Program:
                </label>
                <div className="flex w-full flex-wrap">
                    <div className={'mx-auto' + ' ' + className.global_css}>
                        <NumericUpDown
                            className={'border-b border-black text-center'}
                            id="after_program_weight"
                            name="child_nutritional_status_weight_after"
                            min={1}
                            defaultValue={defaultValue.after_program_weight}
                            readOnly={staffView}
                        />
                        <label>(kg) Weight</label>
                    </div>
                    <div className={'mx-auto' + ' ' + className.global_css}>
                        <NumericUpDown
                            className={'border-b border-black text-center'}
                            id="after_program_height"
                            name="child_nutritional_status_height_after"
                            min={1}
                            defaultValue={defaultValue.after_program_height}
                            readOnly={staffView}
                        />
                        <label>(cm) Height/Length</label>
                    </div>
                </div>
            </div>
        )
    }
    /*
    if (defaultdefaultValue.pwd_number) {
        defaultchecked['pwd_yes'] = true
    } else if (defaultdefaultValue.pwd_number == null) {
        defaultchecked['pwd_no'] = true
    }
    if (defaultValue.pwd_number) {
        checked['pwd_yes'] = true
    } else if (defaultValue.pwd_number == null) {
        checked['pwd_no'] = true
    }
    if (defaultdefaultValue.medical_diagnosis) {
        defaultchecked['special_needs_yes'] = true
    } else if (defaultdefaultValue.medical_diagnosis == null) {
        defaultchecked['special_needs_no'] = true
    }
    if (defaultValue.medical_diagnosis) {
        checked['special_needs_yes'] = true
    } else if (defaultValue.medical_diagnosis == null) {
        checked['special_needs_no'] = true
    }
    if (defaultdefaultValue.with_medical_record) {
        defaultchecked['medical_record_yes'] = true
    } else if (defaultdefaultValue.with_medical_record == 0) {
        defaultchecked['medical_record_no'] = true
    }
    if (defaultValue.with_medical_record) {
        checked['medical_record_yes'] = true
    } else if (defaultValue.with_medical_record == 0) {
        checked['medical_record_no'] = true
    }
    if (defaultValue['4ps_reference_number']) {
        defaultchecked['fourps_member_yes'] = true
    } else if (defaultValue['4ps_reference_number'] == null) {
        defaultchecked['fourps_member_no'] = true
    }
    if (defaultValue['4ps_reference_number']) {
        checked['fourps_member_yes'] = true
    } else if (defaultValue) {
        checked['fourps_member_no'] = true
    }
    if (defaultdefaultValue.birth_certificate == 1) {
        defaultchecked['birth_certificate'] = true
    }
    if (defaultValue.birth_certificate == 1) {
        checked['birth_certificate'] = true
    }
    if (defaultdefaultValue.health_records == 1)
        defaultchecked['health_records'] = true
    if (defaultValue.health_records == 1) checked['health_records'] = true
    if (defaultdefaultValue.no_requirements == 1)
        defaultchecked['no_requirements'] = true
    if (defaultValue.no_requirements == 1) checked['no_requirements'] = true/**/
    return (
        <section id="child_information" className="px-5">
            <div id="a" className={'text-center md:flex' + ' ' + className.div}>
                <label className={'mt-5 text-left' + ' ' + className.label}>
                    Name of the Child:
                </label>
                <div className="mx-auto flex flex-wrap md:w-10/12">
                    <div
                        className={
                            'mx-auto flex-col px-1' + ' ' + className.global_css
                        }
                    >
                        <TextBox
                            className="border-b border-black text-center"
                            id="last_name"
                            name="child_last_name"
                            placeholder="Last Name"
                            defaultValue={defaultValue.last_name}
                            readOnly={staffView}
                        />
                        <label htmlFor="last_name">
                            (Last Name)<span className="text-red-500">*</span>
                        </label>
                    </div>
                    <div
                        className={
                            'mx-auto flex-col px-1' + ' ' + className.global_css
                        }
                    >
                        <TextBox
                            className="border-b border-black text-center"
                            id="first_name"
                            name="child_first_name"
                            placeholder="First Name"
                            defaultValue={defaultValue.first_name}
                            readOnly={staffView}
                        />
                        <label htmlFor="first_name">
                            (First Name)<span className="text-red-500">*</span>
                        </label>
                    </div>
                    <div
                        className={
                            'mx-auto flex-col px-1' + ' ' + className.global_css
                        }
                    >
                        <TextBox
                            className="border-b border-black text-center"
                            id="middle_name"
                            name="child_middle_name"
                            placeholder="Middle Name"
                            defaultValue={defaultValue.middle_name}
                            readOnly={staffView}
                        />
                        <label htmlFor="middle_name">(Middle Name)</label>
                    </div>
                    <div
                        className={
                            'mx-auto flex-col px-1' + ' ' + className.global_css
                        }
                    >
                        <TextBox
                            className="border-b border-black text-center"
                            id="suffix"
                            name="child_suffix"
                            placeholder="Suffix"
                            defaultValue={defaultValue.suffix}
                            readOnly={staffView}
                        />
                        <label htmlFor="suffix">(Suffix)</label>
                    </div>
                </div>
            </div>
            <div id="b" className={'sm:flex' + ' ' + className.div}>
                <div className={'w-full' + ' ' + className.global_css}>
                    <label className={'text-left' + ' ' + className.label}>
                        Nickname:
                    </label>
                    <TextBox
                        className={className.textbox}
                        id="nickname"
                        name="child_nickname"
                        placeholder="Nickname"
                        defaultValue={defaultValue.nickname}
                        readOnly={staffView}
                    />
                </div>
                <div className={'w-full' + ' ' + className.global_css}>
                    <label className={className.label}>
                        Gender:<span className="text-red-500">*</span>
                    </label>
                    <div className="mx-auto flex md:mx-5 md:me-8">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="male"
                                name="child_gender"
                                checked={defaultValue.male}
                                defaultValue="male"
                                readOnly={staffView}
                            />
                            Male
                        </label>
                    </div>

                    <div className="mx-auto flex md:mx-0">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="female"
                                name="child_gender"
                                checked={defaultValue.female}
                                defaultValue="female"
                                readOnly={staffView}
                            />
                            Female
                        </label>
                    </div>
                </div>
            </div>
            <div id="c" className={'flex-wrap md:flex' + ' ' + className.div}>
                <div className={className.global_css}>
                    <label className={className.label}>
                        Date of Birth:<span className="text-red-500">*</span>
                    </label>
                    <DateTimePicker
                        className={'w-40' + ' ' + className.datetimepicker}
                        id="date_of_birth"
                        name="child_date_of_birth"
                        value={defaultValue.date_of_birth}
                        readOnly={staffView}
                    />
                </div>
                <div className={'lg:mx-auto' + ' ' + className.global_css}>
                    <label className={className.label}>
                        Place of Birth:<span className="text-red-500">*</span>
                    </label>
                    <TextBox
                        className={'w-8/12 sm:w-96' + ' ' + className.textbox}
                        id="place_of_birth"
                        name="child_place_of_birth"
                        placeholder="Place of Birth"
                        defaultValue={defaultValue.place_of_birth}
                        readOnly={staffView}
                    />
                </div>
                <div className={'lg:me-auto' + ' ' + className.global_css}>
                    <label className={className.label}>
                        Age:<span className="text-red-500">*</span>
                    </label>
                    <NumericUpDown
                        className={
                            'w-24 text-center' + ' ' + className.numericupdown
                        }
                        id="age"
                        name="child_age"
                        min={1}
                        max={5}
                        defaultValue={defaultValue.age}
                        readOnly={staffView}
                    />
                </div>
            </div>
            <div id="d" className={'lg:flex' + ' ' + className.div}>
                <div
                    className={
                        'md:pe-14 lg:w-8/12 lg:pe-0 xl:pe-20' +
                        ' ' +
                        className.global_css
                    }
                >
                    <label className={className.label}>
                        Address:<span className="text-red-500">*</span>
                    </label>
                    <TextBox
                        className={'w-full' + ' ' + className.textbox}
                        id="address"
                        name="child_address"
                        placeholder="Address"
                        defaultValue={defaultValue.address}
                        readOnly={staffView}
                    />
                </div>
                <div className={className.global_css}>
                    <label className={className.label}>
                        Barangay:<span className="text-red-500">*</span>
                    </label>
                    <TextBox
                        className={className.textbox}
                        id="barangay"
                        name="child_barangay_of_address"
                        placeholder="Barangay"
                        defaultValue={defaultValue.barangay}
                        readOnly={staffView}
                    />
                </div>
            </div>
            <div id="e" className={'sm:flex' + ' ' + className.div}>
                <div className={className.global_css}>
                    <label className={className.label}>
                        Contact No.:<span className="text-red-500">*</span>
                    </label>
                    <TextBox
                        className={
                            'w-fit sm:w-44 md:w-56' + ' ' + className.textbox
                        }
                        id="contact_number"
                        name="child_contact_num"
                        placeholder="(+63) XXX-XXX-XXXX"
                        defaultValue={defaultValue.contact_number}
                        readOnly={staffView}
                    />
                </div>
                <div className={'mx-auto' + ' ' + className.global_css}>
                    <label className={className.label}>
                        Religion:<span className="text-red-500">*</span>
                    </label>
                    <TextBox
                        className={
                            'w-fit sm:w-44 md:w-52 lg:w-fit' +
                            ' ' +
                            className.textbox
                        }
                        id="religion"
                        name="child_religion"
                        placeholder="Religion"
                        defaultValue={defaultValue.religion}
                        readOnly={staffView}
                    />
                </div>
            </div>
            <div id="f" className={'md:flex' + ' ' + className.div}>
                <div
                    className={
                        'me-6 lg:me-3 lg:w-full' + ' ' + className.global_css
                    }
                >
                    <label className={className.label}>PWD:</label>
                    <div className="mx-auto flex sm:mx-36 md:mx-5 md:me-8">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="pwd_yes"
                                name="child_pwd"
                                checked={defaultValue.pwd_yes}
                                defaultValue={1}
                                readOnly={staffView}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="mx-auto flex sm:mx-0">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="pwd_no"
                                name="child_pwd"
                                defaultValue={0}
                                checked={defaultValue.pwd_no}
                                readOnly={staffView}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div
                    className={'mx-auto lg:w-full' + ' ' + className.global_css}
                >
                    <label className={className.label}>
                        If YES, PWD ID Number:
                    </label>
                    <TextBox
                        className={
                            'w-56 sm:w-52 lg:w-fit' + ' ' + className.textbox
                        }
                        id="pwd_number"
                        name="child_pwd_id_number"
                        placeholder="RR-PPMM-BBB-NNNNNNN"
                        defaultValue={defaultValue.pwd_number}
                        readOnly={staffView}
                    />
                </div>
            </div>
            <div id="g" className={'flex flex-wrap' + ' ' + className.div}>
                <div
                    className={
                        'me-5 w-full sm:w-fit' + ' ' + className.global_css
                    }
                >
                    <label className={'me-6 sm:me-4' + ' ' + className.label}>
                        With Special Needs:
                    </label>
                    <div className="mx-auto flex sm:mx-36 md:mx-5 md:me-8">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="special_needs_yes"
                                name="special_needs"
                                defaultValue={1}
                                checked={defaultValue.special_needs_yes}
                                readOnly={staffView}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="mx-auto flex sm:mx-0">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="special_needs_no"
                                name="special_needs"
                                defaultValue={0}
                                readOnly={staffView}
                                checked={defaultValue.special_needs_no}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div
                    className={
                        'w-full md:me-5 md:w-72 lg:me-14 lg:w-72 xl:mx-auto' +
                        ' ' +
                        className.global_css
                    }
                >
                    <label className={className.label}>Diagnosis</label>
                    <TextBox
                        className={
                            'sm:w-9/12 md:w-72' + ' ' + className.textbox
                        }
                        id="medical_diagnosis"
                        name="child_diagnosis"
                        placeholder="diagnosis"
                        defaultValue={defaultValue.medical_diagnosis}
                        readOnly={staffView}
                    />
                </div>
                <div
                    className={
                        'me-auto w-full lg:w-fit' + ' ' + className.global_css
                    }
                >
                    <label className={className.label}>
                        With Medical Record:
                    </label>
                    <div className="mx-auto flex sm:mx-36 md:mx-5 md:me-8">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="medical_record_yes"
                                name="medical_record"
                                defaultValue={1}
                                readOnly={staffView}
                                checked={defaultValue.medical_record_yes}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="mx-auto flex sm:mx-0">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="medical_record_no"
                                name="medical_record"
                                defaultValue={0}
                                readOnly={staffView}
                                checked={defaultValue.medical_record_no}
                            />
                            No
                        </label>
                    </div>
                </div>
            </div>
            <div id="h" className={'flex-wrap md:flex' + ' ' + className.div}>
                <div
                    className={'md:me-24 lg:me-0' + ' ' + className.global_css}
                >
                    <label className={className.label}>4Ps Member:</label>
                    <div className="mx-auto flex sm:mx-36 md:mx-5 md:me-8">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="4ps_member_yes"
                                name="4ps_member"
                                defaultValue={1}
                                readOnly={staffView}
                                checked={defaultValue.fourps_member_yes}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="mx-auto flex sm:mx-0">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id="4ps_member_no"
                                name="4ps_member"
                                defaultValue={0}
                                readOnly={staffView}
                                checked={defaultValue.fourps_member_no}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div className={'lg:mx-auto' + ' ' + className.global_css}>
                    <label className={className.label}>
                        4Ps Reference No.:
                    </label>
                    <TextBox
                        className={
                            'w-60 sm:w-5/12 md:w-fit' + ' ' + className.textbox
                        }
                        id="4ps_reference_number"
                        name="child_4ps_reference_number"
                        placeholder="4Ps Number"
                        readOnly={staffView}
                        defaultValue={defaultValue['4ps_reference_number']}
                    />
                </div>
            </div>
            <div id="i" className={'2xl:flex' + ' ' + className.div}>
                <label className={'mt-5 w-96' + ' ' + className.label}>
                    Nutritional Status Upon Entry:
                </label>
                <div className="flex w-full flex-wrap">
                    <div className={'mx-auto' + ' ' + className.global_css}>
                        <NumericUpDown
                            className={'border-b border-black text-center'}
                            id="upon_entry_weight"
                            name="child_nutritional_status_weight_before"
                            min={1}
                            defaultValue={defaultValue.upon_entry_weight}
                            readOnly={staffView}
                        />
                        <label>
                            (kg) Weight<span className="text-red-500">*</span>
                        </label>
                    </div>
                    <div className={'mx-auto' + ' ' + className.global_css}>
                        <NumericUpDown
                            className={'border-b border-black text-center'}
                            id="upon_entry_height"
                            name="child_nutritional_status_height_before"
                            min={1}
                            defaultValue={defaultValue.upon_entry_height}
                            readOnly={staffView}
                        />
                        <label>
                            (cm) Height/Length
                            <span className="text-red-500">*</span>
                        </label>
                    </div>
                </div>
            </div>
            {div_j}
            <div id="k" className={'flex-wrap md:flex' + ' ' + className.div}>
                <div className={className.global_css}>
                    <label className={className.label}>
                        Date of Last Deworming:
                    </label>
                    <DateTimePicker
                        className={'w-40' + ' ' + className.datetimepicker}
                        id="date_of_last_deworming"
                        name="child_date_of_last_deworming"
                        defaultValue={defaultValue.date_of_last_deworming}
                        readOnly={staffView}
                    />
                </div>
                <div className={'lg:mx-auto' + ' ' + className.global_css}>
                    <label className={className.label}>
                        Date of Last Vitamin A Intake:
                    </label>
                    <DateTimePicker
                        className={'w-40' + ' ' + className.datetimepicker}
                        id="date_of_last_vitamin_a_intake"
                        name="child_date_of_last_vitamin_a_intake"
                        defaultValue={
                            defaultValue.date_of_last_vitamin_a_intake
                        }
                        readOnly={staffView}
                    />
                </div>
            </div>
            <div
                id="l"
                className={
                    'flex flex-wrap ps-9 sm:ms-0 lg:flex-nowrap' +
                    ' ' +
                    className.div
                }
            >
                <div className={className.global_css}>
                    <label
                        className={className.label}
                        htmlFor="birth_certificate"
                    >
                        With Birth Certificate
                    </label>
                    <CheckBox
                        className={className.checkbox}
                        id="birth_certificate"
                        name="child_birth_certificate"
                        value={1}
                        checked={defaultValue.birth_certificate}
                        readOnly={staffView}
                    />
                </div>
                <div className={'mx-7 sm:mx-auto' + ' ' + className.global_css}>
                    <label className={className.label} htmlFor="health_records">
                        With Health Records
                    </label>
                    <CheckBox
                        className={className.checkbox}
                        id="health_records"
                        name="child_health_records"
                        value={1}
                        readOnly={staffView}
                        checked={defaultValue.health_records}
                    />
                </div>
                <div className={'sm:me-auto' + ' ' + className.global_css}>
                    <label
                        className={className.label}
                        htmlFor="no_requirements"
                    >
                        No Requirements
                    </label>
                    <CheckBox
                        className={className.checkbox}
                        id="no_requirements"
                        name="child_no_requirements"
                        value={1}
                        readOnly={staffView}
                        checked={defaultValue.no_requirements}
                    />
                </div>
            </div>
        </section>
    )
}
