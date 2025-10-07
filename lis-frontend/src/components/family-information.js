import {
    TextBox,
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
    label: 'me-2',
}
export default function FamilyInformation({
    staffView = false,
    title,
    relative,
    date,
    maxYear,
    defaultValue = {},
}) {
    const div_b = [],
        age = [],
        sex = [],
        category__others = []
    let minDate, minYear
    if (relative == 'guardian') {
        div_b.push(
            <div
                key="key"
                id={'b'}
                className={'flex-wrap sm:flex' + ' ' + className.div}
            >
                <label className={'mt-5' + ' ' + className.label}>
                    Relationship to the Child:
                    <span className="text-red-500">*</span>
                </label>
                <div className={'mx-auto px-2' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'uncle'}
                            name="relationship_to_the_child"
                            value="Uncle"
                            checked={defaultValue.uncle}
                            readOnly={staffView}
                        />
                        Uncle
                    </label>
                </div>
                <div className={'mx-auto px-2' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'aunt'}
                            name="relationship_to_the_child"
                            value="Aunt"
                            readOnly={staffView}
                            checked={defaultValue.aunt}
                        />
                        Aunt
                    </label>
                </div>
                <div className={'mx-auto px-2' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'grandfather'}
                            name="relationship_to_the_child"
                            value="Grandfather"
                            readOnly={staffView}
                            checked={defaultValue.grandfather}
                        />
                        Grandfather
                    </label>
                </div>
                <div className={'mx-auto px-2' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'grandmother'}
                            name="relationship_to_the_child"
                            value="Grandmother"
                            readOnly={staffView}
                            checked={defaultValue.grandmother}
                        />
                        Grandmother
                    </label>
                </div>
                <div className={'ms-auto ps-2' + ' ' + className.global_css}>
                    <label className={className.label}>
                        <RadioButton
                            className={className.radiobutton}
                            id={'others'}
                            name="relationship_to_the_child"
                            readOnly={staffView}
                            value="others"
                            checked={defaultValue.rttc_others}
                        />
                        Others:
                    </label>
                    <TextBox
                        className={'me-auto' + ' ' + className.textbox}
                        id={'others_relative'}
                        name={relative + '_other_relative'}
                        placeholder="Great Grandfather, etc."
                        defaultValue={defaultValue.rttc_others_relative}
                        readOnly={staffView}
                    />
                </div>
            </div>
        )
        age.push(
            <div
                key="key0"
                className={'ms-auto px-1' + ' ' + className.global_css}
            >
                <label className={className.label}>
                    Age:<span className="text-red-500">*</span>
                </label>
                <NumericUpDown
                    className={
                        'w-24 text-center' + ' ' + className.numericupdown
                    }
                    id={'age'}
                    name={relative + '_age'}
                    min={14}
                    max={150}
                    defaultValue={defaultValue.age}
                    readOnly={staffView}
                />
            </div>
        )
        sex.push(
            <div
                key="key1"
                className={
                    'mx-auto px-1 2xl:mx-auto' + ' ' + className.global_css
                }
            >
                <label className={className.label}>
                    Sex:<span className="text-red-500">*</span>
                </label>
                <TextBox
                    className={'w-36' + ' ' + className.textbox}
                    id="sex"
                    name="sex"
                    placeholder="Sex"
                    defaultValue={defaultValue.sex}
                    readOnly={staffView}
                />
            </div>
        )
        category__others.push(
            <div
                key="key2"
                className={'mx-auto px-1' + ' ' + className.global_css}
            >
                <label>
                    <RadioButton
                        className={className.radiobutton}
                        id={'others'}
                        name={relative + '_category'}
                        value="Others"
                        readOnly={staffView}
                        checked={defaultValue.category_others}
                    />
                    Others
                </label>
            </div>
        )
    }
    return (
        <section
            id={relative + '_information'}
            className={'border-4 px-5 2xl:border-2'}
        >
            <h4 className="my-5 text-center text-xl">
                <strong>{title.toUpperCase()}</strong>
            </h4>
            <div
                id={'a'}
                className={'text-center md:flex' + ' ' + className.div}
            >
                <label className={'mt-5 text-left' + ' ' + className.label}>
                    Name:
                </label>
                <div className="mx-auto flex flex-wrap md:w-10/12">
                    <div
                        className={
                            'mx-auto flex-col px-1 2xl:px-0' +
                            ' ' +
                            className.global_css
                        }
                    >
                        <TextBox
                            className="border-b border-black text-center"
                            id={'last_name'}
                            name={relative + '_last_name'}
                            placeholder="Last Name"
                            defaultValue={defaultValue.last_name}
                            readOnly={staffView}
                        />
                        <label>
                            (Last Name)<span className="text-red-500">*</span>
                        </label>
                    </div>
                    <div
                        className={
                            'mx-auto flex-col px-1 2xl:px-0' +
                            ' ' +
                            className.global_css
                        }
                    >
                        <TextBox
                            className="border-b border-black text-center"
                            id={'first_name'}
                            name={relative + '_first_name'}
                            placeholder="First Name"
                            defaultValue={defaultValue.first_name}
                            readOnly={staffView}
                        />
                        <label>
                            (First Name)<span className="text-red-500">*</span>
                        </label>
                    </div>
                    <div
                        className={
                            'mx-auto flex-col px-1 2xl:px-0' +
                            ' ' +
                            className.global_css
                        }
                    >
                        <TextBox
                            className="border-b border-black text-center"
                            id={'middle_name'}
                            name={relative + '_middle_name'}
                            placeholder="Middle Name"
                            defaultValue={defaultValue.middle_name}
                            readOnly={staffView}
                        />
                        <label>(Middle Name)</label>
                    </div>
                </div>
            </div>
            {div_b}
            <div id={'c'} className={'w-full' + ' ' + className.div}>
                <div className={'w-full' + ' ' + className.global_css}>
                    <label className={className.label}>
                        Address:<span className="text-red-500">*</span>
                    </label>
                    <TextBox
                        className={'w-full' + ' ' + className.textbox}
                        id={'address'}
                        name={relative + '_address'}
                        placeholder="Address"
                        defaultValue={defaultValue.address}
                        readOnly={staffView}
                    />
                </div>
            </div>
            <div id={'d'} className={'flex flex-wrap' + ' ' + className.div}>
                <div className={'pe-5' + ' ' + className.global_css}>
                    <label className={className.label}>
                        Contact No.:<span className="text-red-500">*</span>
                    </label>
                    <TextBox
                        className={'w-fit sm:w-44' + ' ' + className.textbox}
                        id={'contact_number'}
                        name={relative + '_contact_num'}
                        placeholder="(+63) XXX-XXX-XXXX"
                        defaultValue={defaultValue.contact_number}
                        readOnly={staffView}
                    />
                </div>
                <div
                    className={
                        'mx-auto px-1 sm:ms-auto' + ' ' + className.global_css
                    }
                >
                    <label className={className.label}>
                        Date of Birth:<span className="text-red-500">*</span>
                    </label>
                    <DateTimePicker
                        className={'w-40' + ' ' + className.datetimepicker}
                        id={'date_of_birth'}
                        name={relative + '_date_of_birth'}
                        min={minDate}
                        max={date}
                        defaultValue={defaultValue.date_of_birth}
                        readOnly={staffView}
                    />
                </div>
                {age}
                {sex}
            </div>
            <div id={'e'} className={'flex flex-wrap' + ' ' + className.div}>
                <label className={'mt-5' + ' ' + className.label}>
                    Educational Attainment:
                    <span className="text-red-500">*</span>
                </label>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'elementary'}
                            name={relative + '_educational_attainment'}
                            value="Elementary"
                            readOnly={staffView}
                            checked={defaultValue.elementary}
                        />
                        Elementary
                    </label>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'high_school'}
                            name={relative + '_educational_attainment'}
                            value="High School"
                            readOnly={staffView}
                            checked={defaultValue.high_school}
                        />
                        High School
                    </label>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'techvoc'}
                            name={relative + '_educational_attainment'}
                            value="Tech/Voc"
                            readOnly={staffView}
                            checked={defaultValue.tech_voc}
                        />
                        Tech/Voc
                    </label>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'college'}
                            name={relative + '_educational_attainment'}
                            value="College"
                            readOnly={staffView}
                            checked={defaultValue.college}
                        />
                        College
                    </label>
                </div>
            </div>
            <div id={'f'} className={'flex flex-wrap' + ' ' + className.div}>
                <label className={'mt-5' + ' ' + className.label}>
                    Civil Status:<span className="text-red-500">*</span>
                </label>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'single'}
                            name={relative + '_civil_status'}
                            value="Single"
                            checked={defaultValue.single}
                            readOnly={staffView}
                        />
                        Single
                    </label>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'married'}
                            name={relative + '_civil_status'}
                            value="Married"
                            readOnly={staffView}
                            checked={defaultValue.married}
                        />
                        Married
                    </label>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'widowed'}
                            name={relative + '_civil_status'}
                            value="Widowed"
                            readOnly={staffView}
                            checked={defaultValue.widowed}
                        />
                        Widowed
                    </label>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'legally_separated'}
                            name={relative + '_civil_status'}
                            value="Legally Separated"
                            readOnly={staffView}
                            checked={defaultValue.legally_separated}
                        />
                        Legally Separated
                    </label>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'divorced'}
                            name={relative + '_civil_status'}
                            value="Divorced"
                            readOnly={staffView}
                            checked={defaultValue.divorced}
                        />
                        Divorced
                    </label>
                </div>
            </div>
            <div id={'g'} className={'w-full' + ' ' + className.div}>
                <div className={'w-full' + ' ' + className.global_css}>
                    <label className={className.label}>
                        Occupation:<span className="text-red-500">*</span>
                    </label>
                    <TextBox
                        className={'w-full' + ' ' + className.textbox}
                        id={'occupation'}
                        name={relative + '_occupation'}
                        placeholder="Occupation"
                        readOnly={staffView}
                        defaultValue={defaultValue.occupation}
                    />
                </div>
            </div>
            <div id={'h'} className={'w-full' + ' ' + className.div}>
                <div className={'w-full' + ' ' + className.global_css}>
                    <label className={'lg:w-44' + ' ' + className.label}>
                        Business Address:<span className="text-red-500">*</span>
                    </label>
                    <TextBox
                        className={'w-full' + ' ' + className.textbox}
                        id={'business_address'}
                        name={relative + '_business_address'}
                        placeholder="Business Address"
                        defaultValue={defaultValue.business_address}
                        readOnly={staffView}
                    />
                </div>
            </div>
            <div id={'i'} className={'flex flex-wrap' + ' ' + className.div}>
                <div className={'mt-5 pe-5' + ' ' + className.global_css}>
                    <label className={className.label}>
                        Registered Voter of Muntinlupa:
                    </label>
                    <div className="ms-5">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id={'registered_voter_of_muntinlupa_yes'}
                                name={
                                    relative + '_registered_voter_of_muntinlupa'
                                }
                                value={1}
                                readOnly={staffView}
                                checked={defaultValue.registered_voter_yes}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="ms-5">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id={'registered_voter_of_muntinlupa_no'}
                                name={
                                    relative + '_registered_voter_of_muntinlupa'
                                }
                                value={0}
                                readOnly={staffView}
                                checked={defaultValue.registered_voter_no}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label className={className.label}>Precinct No.:</label>
                    <TextBox
                        className={className.textbox}
                        id={'precinct_number'}
                        name={relative + '_precint_num'}
                        placeholder="XXXX-XXXX"
                        defaultValue={defaultValue.precinct_number}
                        readOnly={staffView}
                    />
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label className={className.label}>Barangay:</label>
                    <TextBox
                        className={className.textbox}
                        id={'barangay'}
                        name={relative + '_barangay'}
                        placeholder="Barangay"
                        defaultValue={defaultValue.barangay}
                        readOnly={staffView}
                    />
                </div>
            </div>
            <div id={'j'} className={'md:flex' + ' ' + className.div}>
                <div className={className.global_css + ' ' + 'mt-5 pe-5'}>
                    <label className={className.label}>
                        TUPAD Beneficiary:
                    </label>
                    <div className="ms-5">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id={'tupad_beneficiary_yes'}
                                name={relative + '_tupad_beneficiary'}
                                value={1}
                                readOnly={staffView}
                                checked={defaultValue.tupad_beneficiary_yes}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="ms-5">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id={'tupad_beneficiary_no'}
                                name={relative + '_tupad_beneficiary'}
                                value={0}
                                readOnly={staffView}
                                checked={defaultValue.tupad_beneficiary_no}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label className={className.label}>If YES What Year:</label>
                    <NumericUpDown
                        className={'w-24' + ' ' + className.numericupdown}
                        key={relative + '_tupad_year'}
                        id={'tupad_beneficiary_year'}
                        name={relative + '_tupad_year'}
                        min={minYear}
                        max={maxYear}
                        defaultValue={defaultValue.tupad_beneficiary_year}
                        readOnly={staffView}
                    />
                </div>
            </div>
            <div id={'k'} className={'flex-wrap md:flex' + ' ' + className.div}>
                <label className={'mt-5' + ' ' + className.label}>
                    Category:<span className="text-red-500">*</span>
                </label>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'undernourished_child'}
                            name={relative + '_category'}
                            value="Undernourished Child"
                            readOnly={staffView}
                            checked={defaultValue.undernourished_child}
                        />
                        Undernourished Child
                    </label>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'solo_parent'}
                            name={relative + '_category'}
                            value="Solo Parent"
                            readOnly={staffView}
                            checked={defaultValue.solo_parent}
                        />
                        Solo Parent
                    </label>
                </div>
                <div className={'mx-auto px-1' + ' ' + className.global_css}>
                    <label>
                        <RadioButton
                            className={className.radiobutton}
                            id={'unemployed'}
                            name={relative + '_category'}
                            value="Unemployed"
                            readOnly={staffView}
                            checked={defaultValue.unemployed}
                        />
                        Unemployed
                    </label>
                </div>
                {category__others}
            </div>
            <div id={'l'} className={'flex flex-wrap pb-5'}>
                <div className={'pe-5' + ' ' + className.global_css}>
                    <label className={className.label}>PWD:</label>
                    <div className={'ms-5'}>
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id={'pwd_yes'}
                                name={relative + '_pwd'}
                                value={1}
                                readOnly={staffView}
                                checked={defaultValue.pwd_yes}
                            />
                            Yes
                        </label>
                    </div>
                    <div className="ms-5">
                        <label>
                            <RadioButton
                                className={className.radiobutton}
                                id={'pwd_no'}
                                name={relative + '_pwd'}
                                value={0}
                                readOnly={staffView}
                                checked={defaultValue.pwd_no}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div className={'md:mx-auto' + ' ' + className.global_css}>
                    <label className={className.label}>
                        If YES, PWD ID Number:
                    </label>
                    <TextBox
                        className={className.textbox}
                        id={'pwd_number'}
                        name={relative + '_pwd_num'}
                        placeholder="RR-PPMM-BBB-NNNNNNN"
                        readOnly={staffView}
                        defaultValue={defaultValue.pwd_number}
                    />
                </div>
            </div>
        </section>
    )
}
