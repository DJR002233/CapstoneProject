export default function Scaledscoresgraph({ id }) {
    const sad = [],
        ad = [],
        rt = []
    for (let i = 19; i >= 14; i--) {
        const className =
                'bg-color-high-yellow border-color-gray border-e-2 w-10',
            number_td =
                'bg-color-high-yellow border-e-2 border-red-500 pb-2 pt-4'
        sad.push(
            <tr key={'tr_' + i + '_' + id}>
                <td className={number_td} key={i + '_' + id}>
                    {i}
                </td>
                <td
                    className={className}
                    id={'Gross_Motor_' + i + '_' + id}
                    key={'Gross_Motor_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Fine_Motor_' + i + '_' + id}
                    key={'Fine_Motor_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Self-Help_' + i + '_' + id}
                    key={'Self-Help_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Receptive_Language_' + i + '_' + id}
                    key={'Receptive_Language_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Expressive_Language_' + i + '_' + id}
                    key={'Expressive_Language_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Cognitive_' + i + '_' + id}
                    key={'Cognitive_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Social-Emotional_' + i + '_' + id}
                    key={'Social-Emotional_' + i + '_' + id}
                >
                    •
                </td>
            </tr>
        )
    }
    for (let i = 13; i >= 7; i--) {
        let className = 'bg-color-average-yellow border-color-gray border-e-2',
            number_td = 'bg-color-average-yellow border-e-2 border-red-500 py-2'
        if (i == 10) {
            className = 'bg-blue-200 border-color-gray border-e-2'
            number_td = 'bg-blue-200 border-e-2 border-red-500 py-2'
        }
        ad.push(
            <tr key={'tr_' + i + '_' + id}>
                <td className={number_td} key={i + '_' + id}>
                    {i}
                </td>
                <td
                    className={className}
                    id={'Gross_Motor_' + i + '_' + id}
                    key={'Gross_Motor_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Fine_Motor_' + i + '_' + id}
                    key={'Fine_Motor_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Self-Help_' + i + '_' + id}
                    key={'Self-Help_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Receptive_Language_' + i + '_' + id}
                    key={'Receptive_Language_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Expressive_Language_' + i + '_' + id}
                    key={'Expressive_Language_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Cognitive_' + i + '_' + id}
                    key={'Cognitive_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Social-Emotional_' + i + '_' + id}
                    key={'Social-Emotional_' + i + '_' + id}
                >
                    •
                </td>
            </tr>
        )
    }
    for (let i = 6; i >= 1; i--) {
        const className = 'bg-color-low-yellow border-color-gray border-e-2',
            number_td = 'bg-color-low-yellow border-e-2 border-red-500 py-2'
        ad.push(
            <tr key={'tr_' + i + '_' + id}>
                <td className={number_td} key={i + '_' + id}>
                    {i}
                </td>
                <td
                    className={className}
                    id={'Gross_Motor_' + i + '_' + id}
                    key={'Gross_Motor_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Fine_Motor_' + i + '_' + id}
                    key={'Fine_Motor_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Self-Help_' + i + '_' + id}
                    key={'Self-Help_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Receptive_Language_' + i + '_' + id}
                    key={'Receptive_Language_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Expressive_Language_' + i + '_' + id}
                    key={'Expressive_Language_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Cognitive_' + i + '_' + id}
                    key={'Cognitive_' + i + '_' + id}
                >
                    •
                </td>
                <td
                    className={className}
                    id={'Social-Emotional_' + i + '_' + id}
                    key={'Social-Emotional_' + i + '_' + id}
                >
                    •
                </td>
            </tr>
        )
    }
    return (
        <div className="width-100 h-auto pe-4 ps-7 pt-3 text-black">
            <div className="my-2 flex ps-2" id={'div_' + id}>
                <label className="me-2 font-medium" htmlFor={'age_' + id}>
                    Child's Age:
                </label>
                <p className="mx-auto font-medium" id={'age_' + id}></p>
            </div>
            <table
                id={'scaled_scores_table_' + id}
                className="w-full text-center"
            >
                <thead className="border-color-purpleishblue-dark border-color-b-gray-dark relative cursor-default border-x-4">
                    <tr>
                        <th
                            className="bg-color-purpleishblue-dark text-xl font-black text-white"
                            colSpan={8}
                        >
                            DOMAIN
                        </th>
                    </tr>
                    <tr className="text-left align-text-bottom">
                        <th className="border-e-2 border-red-500 bg-red-500 text-white">
                            <span className="writing-mode-rl rotate-180">
                                SCALED SCORE
                            </span>
                        </th>
                        <th className="border-color-gray border-e-2 bg-white">
                            <span className="writing-mode-rl rotate-180">
                                GROSS MOTOR
                            </span>
                        </th>
                        <th className="border-color-gray border-e-2 bg-white">
                            <span className="writing-mode-rl rotate-180">
                                FINE MOTOR
                            </span>
                        </th>
                        <th className="border-color-gray border-e-2 bg-white">
                            <span className="writing-mode-rl rotate-180">
                                SELF-HELP
                            </span>
                        </th>
                        <th className="border-color-gray border-e-2 bg-white">
                            <span className="writing-mode-rl rotate-180">
                                RECEPTIVE LANGUAGE
                            </span>
                        </th>
                        <th className="border-color-gray border-e-2 bg-white">
                            <span className="writing-mode-rl rotate-180">
                                EXPRESSIVE LANGUAGE
                            </span>
                        </th>
                        <th className="border-color-gray border-e-2 bg-white">
                            <span className="writing-mode-rl rotate-180">
                                COGNITIVE
                            </span>
                        </th>
                        <th className="bg-white">
                            <span className="writing-mode-rl rotate-180">
                                SOCIAL-EMOTIONAL
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody
                    className="border-color-purpleishblue-dark border-x-4"
                    id={'scaled_scores_tbody_' + id}
                >
                    {sad}
                    {ad}
                    {rt}
                </tbody>
            </table>
        </div>
    )
}
