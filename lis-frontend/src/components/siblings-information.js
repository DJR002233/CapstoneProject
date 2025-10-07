import { DateTimePicker, NumericUpDown, TextBox } from '@/app/_lib/form-html'
const className = {
        table: 'w-full border-2 overflow-x-scroll',
        tabledata: 'border',
        tableHeader: 'border-e-2 border-b-2',
        textbox: 'w-full text-center',
        DateTimePicker: 'w-full flex justify-center',
        numericupdown: 'w-full text-center',
    },
    siblingNamePlaceholder = 'sibling name (pangalan ng kapatid)',
    siblingGradelevelPlaceholder = 'Grade level',
    min = 1,
    max = 15
export default function SiblingsInformation({
    staffView = false,
    defaultValue = {},
}) {
    // console.log(defaultValue)
    return (
        <table id="siblings_information" className={className.table}>
            <thead>
                <tr>
                    <th className={className.tableHeader}>
                        Name of Siblings
                        <br />
                        (Mga Kapatid)
                    </th>
                    <th className={className.tableHeader}>Date of Birth</th>
                    <th className={className.tableHeader}>Age</th>
                    <th className={className.tableHeader}>Grade / Level</th>
                </tr>
            </thead>
            <tbody id="tbody">
                <tr id="0">
                    <td className={className.tabledata}>
                        <TextBox
                            className={className.textbox}
                            id="name"
                            name="sibling_1_name"
                            placeholder={siblingNamePlaceholder}
                            defaultValue={defaultValue.sibling_1_name}
                            readOnly={staffView}
                        />
                    </td>
                    <td className={className.tabledata}>
                        <DateTimePicker
                            className={className.DateTimePicker}
                            id="date_of_birth"
                            name="sibling_1_date_of_birth"
                            defaultValue={defaultValue.sibling_1_date_of_birth}
                            readOnly={staffView}
                        />
                    </td>
                    <td className={className.tabledata}>
                        <NumericUpDown
                            className={className.numericupdown}
                            id="age"
                            name="sibling_1_age"
                            min={min}
                            max={max}
                            defaultValue={defaultValue.sibling_1_age}
                            readOnly={staffView}
                        />
                    </td>
                    <td className={className.tabledata}>
                        <TextBox
                            className={className.textbox}
                            id="grade_level"
                            name="sibling_1_grade_level"
                            placeholder={siblingGradelevelPlaceholder}
                            defaultValue={defaultValue.sibling_1_grade_level}
                            readOnly={staffView}
                        />
                    </td>
                </tr>
                <tr id="1">
                    <td className={className.tabledata}>
                        <TextBox
                            className={className.textbox}
                            id="name"
                            name="sibling_2_name"
                            placeholder={siblingNamePlaceholder}
                            defaultValue={defaultValue.sibling_2_name}
                            readOnly={staffView}
                        />
                    </td>
                    <td className={className.tabledata}>
                        <DateTimePicker
                            className={className.DateTimePicker}
                            id="date_of_birth"
                            name="sibling_2_date_of_birth"
                            defaultValue={defaultValue.sibling_2_date_of_birth}
                            readOnly={staffView}
                        />
                    </td>
                    <td className={className.tabledata}>
                        <NumericUpDown
                            className={className.numericupdown}
                            id="age"
                            name="sibling_2_age"
                            min={min}
                            max={max}
                            defaultValue={defaultValue.sibling_2_age}
                            readOnly={staffView}
                        />
                    </td>
                    <td className={className.tabledata}>
                        <TextBox
                            className={className.textbox}
                            id="grade_level"
                            name="sibling_2_grade_level"
                            placeholder={siblingGradelevelPlaceholder}
                            defaultValue={defaultValue.sibling_2_grade_level}
                            readOnly={staffView}
                        />
                    </td>
                </tr>
                <tr id="2">
                    <td className={className.tabledata}>
                        <TextBox
                            className={className.textbox}
                            id="name"
                            name="sibling_3_name"
                            placeholder={siblingNamePlaceholder}
                            defaultValue={defaultValue.sibling_3_name}
                            readOnly={staffView}
                        />
                    </td>
                    <td className={className.tabledata}>
                        <DateTimePicker
                            className={className.DateTimePicker}
                            id="date_of_birth"
                            name="sibling_3_date_of_birth"
                            defaultValue={defaultValue.sibling_3_date_of_birth}
                            readOnly={staffView}
                        />
                    </td>
                    <td className={className.tabledata}>
                        <NumericUpDown
                            className={className.numericupdown}
                            id="age"
                            name="sibling_3_age"
                            min={min}
                            max={max}
                            defaultValue={defaultValue.sibling_3_age}
                            readOnly={staffView}
                        />
                    </td>
                    <td className={className.tabledata}>
                        <TextBox
                            className={className.textbox}
                            id="grade_level"
                            name="sibling_3_grade_level"
                            placeholder={siblingGradelevelPlaceholder}
                            defaultValue={defaultValue.sibling_3_grade_level}
                            readOnly={staffView}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
