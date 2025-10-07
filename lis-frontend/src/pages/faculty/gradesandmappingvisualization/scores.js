'use client'

import { useEffect } from 'react'

export default function Scores({ data }) {
    useEffect(() => {
        if (typeof data == 'object') {
            if (data[0]) addScoreValues(data[0], 0)
            if (data[1]) addScoreValues(data[1], 2)
            if (data[2]) addScoreValues(data[2], 4)
        }
    }, [])
    return (
        <>
            <h1 className="text-center text-4xl">Scores</h1>
            <br />
            <div className="h-auto w-full overflow-x-auto overflow-y-auto bg-slate-300 text-black">
                <table id="scores_table" className="w-full text-center">
                    <thead className="sticky top-0 cursor-default border-e-4 border-blue-900 bg-white">
                        <tr>
                            <th
                                className="border-4-before border-x-4 border-blue-900 bg-blue-900 text-4xl font-black text-white"
                                rowSpan={5}
                            >
                                Domain
                            </th>
                            <th
                                className="border-2-after border-e-4 border-blue-900 text-xl font-black text-blue-900"
                                colSpan={6}
                            >
                                Age
                            </th>
                        </tr>
                        {/*date row*/}
                        <tr>
                            <th>
                                1<sup>st</sup> Evaluation
                            </th>
                            <th
                                id="date_0"
                                className="border-e-2 border-blue-900 text-left"
                            >
                                Date:
                            </th>
                            <th>
                                2<sup>nd</sup> Evaluation
                            </th>
                            <th
                                id="date_2"
                                className="border-e-2 border-blue-900 text-left"
                            >
                                Date:
                            </th>
                            <th>
                                3<sup>rd</sup> Evaluation
                            </th>
                            <th
                                id="date_4"
                                className="border-e-4 border-blue-900 text-left"
                            >
                                Date:
                            </th>
                        </tr>
                        {/*child age row*/}
                        <tr>
                            <th
                                className="h-7 border-e-2 border-blue-900"
                                id="age_0"
                                colSpan={2}
                            ></th>
                            <th
                                className="h-7 border-e-2 border-blue-900"
                                id="age_2"
                                colSpan={2}
                            ></th>
                            <th
                                className="h-7 border-e-4 border-blue-900"
                                id="age_4"
                                colSpan={2}
                            ></th>
                        </tr>
                        <tr>
                            <th
                                className="border-e-2 border-blue-900"
                                colSpan={2}
                            >
                                Child's Age
                            </th>
                            <th
                                className="border-e-2 border-blue-900"
                                colSpan={2}
                            >
                                Child's Age
                            </th>
                            <th
                                className="border-e-4 border-blue-900"
                                colSpan={2}
                            >
                                Child's Age
                            </th>
                        </tr>
                        <tr>
                            <th className="border-e-2 border-blue-900 bg-red-500 text-white">
                                Raw Score
                            </th>
                            <th className="border-e-2 border-blue-900 bg-red-500 text-white">
                                Scaled Score
                            </th>
                            <th className="border-e-2 border-blue-900 bg-red-500 text-white">
                                Raw Score
                            </th>
                            <th className="border-e-2 border-blue-900 bg-red-500 text-white">
                                Scaled Score
                            </th>
                            <th className="border-e-2 border-blue-900 bg-red-500 text-white">
                                Raw Score
                            </th>
                            <th className="border-e-4 border-blue-900 bg-red-500 text-white">
                                Scaled Score
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        id="tbodyscores1"
                        className="border-x-4 border-b-4 border-blue-900 bg-white"
                    >
                        <tr>
                            <td className="border-x-4 border-b-2 border-blue-900 text-left">
                                Gross Motor
                            </td>
                            <td
                                id="Gross_Motor_0"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Gross_Motor_1"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Gross_Motor_2"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Gross_Motor_3"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Gross_Motor_4"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Gross_Motor_5"
                                className="border-b-2 border-e-4 border-blue-900"
                            ></td>
                        </tr>
                        <tr>
                            <td className="border-x-4 border-y-2 border-blue-900 text-left">
                                Fine Motor
                            </td>
                            <td
                                id="Fine_Motor_0"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Fine_Motor_1"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Fine_Motor_2"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Fine_Motor_3"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Fine_Motor_4"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Fine_Motor_5"
                                className="border-b-2 border-e-4 border-blue-900"
                            ></td>
                        </tr>
                        <tr>
                            <td className="border-x-4 border-y-2 border-blue-900 text-left">
                                Self-Help
                            </td>
                            <td
                                id="Self-Help_0"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Self-Help_1"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Self-Help_2"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Self-Help_3"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Self-Help_4"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Self-Help_5"
                                className="border-b-2 border-e-4 border-blue-900"
                            ></td>
                        </tr>
                        <tr>
                            <td className="border-x-4 border-y-2 border-blue-900 text-left">
                                Receptive Language
                            </td>
                            <td
                                id="Receptive_Language_0"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Receptive_Language_1"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Receptive_Language_2"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Receptive_Language_3"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Receptive_Language_4"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Receptive_Language_5"
                                className="border-b-2 border-e-4 border-blue-900"
                            ></td>
                        </tr>
                        <tr>
                            <td className="border-x-4 border-y-2 border-blue-900 text-left">
                                Expressive Language
                            </td>
                            <td
                                id="Expressive_Language_0"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Expressive_Language_1"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Expressive_Language_2"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Expressive_Language_3"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Expressive_Language_4"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Expressive_Language_5"
                                className="border-b-2 border-e-4 border-blue-900"
                            ></td>
                        </tr>
                        <tr>
                            <td className="border-x-4 border-y-2 border-blue-900 text-left">
                                Cognitive
                            </td>
                            <td
                                id="Cognitive_0"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Cognitive_1"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Cognitive_2"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Cognitive_3"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Cognitive_4"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Cognitive_5"
                                className="border-b-2 border-e-4 border-blue-900"
                            ></td>
                        </tr>
                        <tr>
                            <td className="border-x-4 border-y-2 border-blue-900 text-left">
                                Social-Emotional
                            </td>
                            <td
                                id="Social-Emotional_0"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Social-Emotional_1"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Social-Emotional_2"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Social-Emotional_3"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Social-Emotional_4"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Social-Emotional_5"
                                className="border-b-2 border-e-4 border-blue-900"
                            ></td>
                        </tr>
                        <tr>
                            <td className="border-x-4 border-y-2 border-blue-900 text-left font-medium text-pink-600">
                                Sum of Scaled Scores
                            </td>
                            <td
                                id="Sum_of_Scaled_Scores_0_null"
                                className="border-e-2 border-blue-900 bg-slate-400"
                            ></td>
                            <td
                                id="Sum_of_Scaled_Scores_0"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Sum_of_Scaled_Scores_2_null"
                                className="border-e-2 border-blue-900 bg-slate-400"
                            ></td>
                            <td
                                id="Sum_of_Scaled_Scores_2"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Sum_of_Scaled_Scores_4_null"
                                className="border-e-2 border-blue-900 bg-slate-400"
                            ></td>
                            <td
                                id="Sum_of_Scaled_Scores_4"
                                className="border-b-2 border-e-4 border-blue-900"
                            ></td>
                        </tr>
                        <tr>
                            <td className="border-x-4 border-y-2 border-blue-900 text-left font-medium text-pink-600">
                                Standard Score
                            </td>
                            <td
                                id="Standard_Score_0_null"
                                className="border-b-2 border-e-2 border-blue-900 bg-slate-400"
                            ></td>
                            <td
                                id="Standard_Score_0"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Standard_Score_2_null"
                                className="border-b-2 border-e-2 border-blue-900 bg-slate-400"
                            ></td>
                            <td
                                id="Standard_Score_2"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Standard_Score_4_null"
                                className="border-b-2 border-e-2 border-blue-900 bg-slate-400"
                            ></td>
                            <td
                                id="Standard_Score_4"
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                        </tr>
                        <tr>
                            <td className="border-x-4 border-y-2 border-blue-900 text-left font-medium text-pink-600">
                                Interpretation
                            </td>
                            <td
                                id="Interpretation_0"
                                colSpan={2}
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Interpretation_2"
                                colSpan={2}
                                className="border-b-2 border-e-2 border-blue-900"
                            ></td>
                            <td
                                id="Interpretation_4"
                                colSpan={2}
                                className="border-b-2 border-e-4 border-blue-900"
                            ></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export function addScores(data = []) {
    if (typeof data != 'object') return false
    //index = 0 (1st Eval), 2 (2nd Eval), or 4 (3rd Eval. yes it is 4)
    resetScores()
    addScoreValues(data[0], 0)
    addScoreValues(data[1], 2)
    addScoreValues(data[2], 4)
}
function addScoreValues(grades, index) {
    if (!grades) return false
    const arr = [
        'Gross_Motor_',
        'Fine_Motor_',
        'Self-Help_',
        'Receptive_Language_',
        'Expressive_Language_',
        'Cognitive_',
        'Social-Emotional_',
    ]
    const key = Object.keys(grades)
    for (let i = 0; i < 7; i++) {
        const obj = JSON.parse(grades[key[i + 2]])
        document.getElementById(arr[i] + index).innerText = obj.raw
        document.getElementById(arr[i] + (index + 1)).innerText = obj.scaled
    }
    document.getElementById('Sum_of_Scaled_Scores_' + index).innerText =
        grades[key[9]]
    document.getElementById('Standard_Score_' + index).innerText =
        grades[key[10]]
    document.getElementById('Interpretation_' + index).innerText =
        grades[key[11]]
    const datetime = new Date(grades[key[12]]),
        month = datetime.getMonth() + 1,
        day = datetime.getDate(),
        year = datetime.getFullYear()
    document.getElementById('date_' + index).innerText =
        'Date: ' + month + '-' + day + '-' + year
    document.getElementById('date_' + index).className =
        'border-e-2 border-blue-900 text-center'
    document.getElementById('age_' + index).innerText =
        diff_months(
            new Date(year + '-' + month + '-' + day),
            new Date(grades[key[13]])
        ) + ' month/s old'
}

export function resetScores() {
    const arr = [
            'Gross_Motor_',
            'Fine_Motor_',
            'Self-Help_',
            'Receptive_Language_',
            'Expressive_Language_',
            'Cognitive_',
            'Social-Emotional_',
        ],
        indexes = [0, 2, 4]
    for (let index_length = 0; index_length < indexes.length; index_length++) {
        const index = indexes[index_length]
        for (let i = 0; i < 7; i++) {
            document.getElementById(arr[i] + index).innerText = ''
            document.getElementById(arr[i] + (index + 1)).innerText = ''
        }
        document.getElementById('Sum_of_Scaled_Scores_' + index).innerText = ''
        document.getElementById('Standard_Score_' + index).innerText = ''
        document.getElementById('Interpretation_' + index).innerText = ''
        document.getElementById('date_' + index).innerText = 'Date:'
        document.getElementById('date_' + index).className =
            'border-e-2 border-blue-900 text-left'
        document.getElementById('age_' + index).innerText = ''
    }
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
