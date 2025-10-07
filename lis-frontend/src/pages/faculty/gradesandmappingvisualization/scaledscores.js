'use client'
import { useEffect } from 'react'
import Scaledscoresgraph from './components/Scaledscoregraph'
import '@/pages/faculty/gradesandmappingvisualization/css/Scaledscores.css'

let prevData = null

export default function Scaledscores({ data }) {
    useEffect(() => {
        if (data) addScaledScores(data)
    }, [])

    return (
        <>
            <br />
            <h1 className="relative text-center text-4xl">Scaled Scores</h1>
            <br />
            <div className="w-full overflow-x-auto">
                <div
                    className="w-fixed-72 relative mx-auto flex overflow-x-auto border-4 border-blue-950"
                    id="scaleds"
                >
                    <div className="me-8">
                        <span className="writing-mode-rl high rotate-180 text-center text-lg">
                            Suggests advanced
                            <br />
                            development
                        </span>
                        <span className="writing-mode-rl average rotate-180 text-lg">
                            Average development
                        </span>
                        <span className="writing-mode-rl low rotate-180 text-lg">
                            Re-test after 3-6 months
                        </span>
                    </div>
                    <svg
                        className="absolute z-10"
                        id="ss_svg"
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                    <Scaledscoresgraph id={0} />
                    <Scaledscoresgraph id={1} />
                    <Scaledscoresgraph id={2} />
                </div>
            </div>
        </>
    )
}
export function addScaledScores(data = [], dataIndex) {
    // return true
    const arr = [data[0], data[1], data[2]],
        cols = [
            'Gross_Motor_',
            'Fine_Motor_',
            'Self-Help_',
            'Receptive_Language_',
            'Expressive_Language_',
            'Cognitive_',
            'Social-Emotional_',
        ]
    if (prevData) {
        const prevarr = [prevData[0], prevData[1], prevData[2]]
        for (let i = 0; i < 3; i++) {
            if (!prevarr[i]) break
            const prevkey = Object.keys(prevarr[i])
            for (let x = 0; x <= 6; x++) {
                const obj = JSON.parse(prevarr[i][prevkey[x + 2]])
                if (
                    parseInt(obj['scaled']) <= 19 &&
                    parseInt(obj['scaled']) >= 1
                )
                    document.getElementById(
                        cols[x] + obj['scaled'] + '_' + i
                    ).innerHTML = '•'
            }
        }
    }
    document.getElementById('ss_svg').innerHTML = ''
    prevData = data
    for (let i = 0; i < 3; i++) {
        if (!arr[i]) break
        const key = Object.keys(arr[i])
        //age in months
        if (key.length > 0) {
            const datetime = new Date(arr[i][key[12]]),
                month = datetime.getMonth() + 1,
                day = datetime.getDate(),
                year = datetime.getFullYear(),
                div = document.getElementById('div_' + i)
            div.getElementsByTagName('p')[0].innerText =
                diff_months(
                    new Date(year + '-' + month + '-' + day),
                    new Date(arr[i][key[13]])
                ) + ' month/s old'
        }
        //connecting line
        for (let x = 0; x <= 6; x++) {
            const obj = JSON.parse(arr[i][key[x + 2]]), prevobj = JSON.parse(arr[i][key[x + 1]])
            let scaled = obj['scaled'], prev_scaled = prevobj['scaled']
            // console.log(parseInt(scaled) < 1)
            if (parseInt(scaled) > 19) { scaled = 19 } else if (parseInt(scaled) < 1) { scaled = 1 }
            if (parseInt(prev_scaled) > 19) { prev_scaled = 19 } else if (parseInt(prev_scaled) < 1) { prev_scaled = 1 }
            document.getElementById(
                cols[x] + scaled + '_' + i
            ).innerHTML = '<strong>X</strong>'

            if (x > 0) {
                const line = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'line'
                ),
                    targetXY = getTargetAxis(
                        document
                            .getElementById(
                                cols[x - 1] + prev_scaled + '_' + i
                            )
                            .getBoundingClientRect()
                    ),
                    targetXY2 = getTargetAxis(
                        document
                            .getElementById(cols[x] + scaled + '_' + i)
                            .getBoundingClientRect()
                    )
                line.setAttribute('x1', targetXY[0])
                line.setAttribute('y1', targetXY[1])
                line.setAttribute('x2', targetXY2[0])
                line.setAttribute('y2', targetXY2[1])
                line.setAttribute('stroke', 'black')
                line.setAttribute('id', 'line')
                document.getElementById('ss_svg').appendChild(line)
            }
        }
    }
}
export function resetTable() {
    const cols = [
        'Gross_Motor_',
        'Fine_Motor_',
        'Self-Help_',
        'Receptive_Language_',
        'Expressive_Language_',
        'Cognitive_',
        'Social-Emotional_',
    ]
    if (prevData) {
        const prevarr = [prevData[0], prevData[1], prevData[2]]
        for (let i = 0; i < 3; i++) {
            if (!prevarr[i]) break
            const prevkey = Object.keys(prevarr[i])
            for (let x = 0; x <= 6; x++) {
                const obj = JSON.parse(prevarr[i][prevkey[x + 2]])
                if (
                    parseInt(obj['scaled']) <= 19 &&
                    parseInt(obj['scaled']) >= 1
                )
                    document.getElementById(
                        cols[x] + obj['scaled'] + '_' + i
                    ).innerHTML = '•'
            }
        }
    }
    document.getElementById('ss_svg').innerHTML = ''
    prevData = null
}
function getTargetAxis(targetAxis) {
    // msEdge
    if (typeof targetAxis != 'object') return false
    const parentXaxis = document
        .getElementById('scaleds')
        .getBoundingClientRect().x,
        parentYaxis = document
            .getElementById('scaleds')
            .getBoundingClientRect().y
    // console.log(
    //     document.getElementById('scaleds').getBoundingClientRect()
    // )
    let targetXaxis = targetAxis.x + targetAxis.width / 2 - parentXaxis - 4,
        targetYaxis = targetAxis.y + targetAxis.height / 2 - parentYaxis - 4
    if (targetXaxis < 0) targetXaxis *= -1
    if (targetYaxis < 0) targetYaxis *= -1
    return [targetXaxis, targetYaxis] /**/
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

/*

// document
        //     .getElementById('scaleds')
        //     .removeChild(document.getElementById('ss_svg'))

        // const svg = document.createElementNS(
        //     'http://www.w3.org/2000/svg',
        //     'svg'
        // )
        // svg.setAttribute('className', 'absolute')
        // svg.setAttribute('width', '100%')
        // svg.setAttribute('height', '100%')
        // svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        // svg.setAttribute('id', 'ss_svg')

<svg width={500} height={700}>
                    <line x1="100" y1="100" x2="200" y2="200" stroke="black" />
                </svg>


const svg = document.createElement('svg'),
                    line = document.createElement('line'),
                    xy1 = document
                        .getElementById(cols[x - 1] + obj['scaled'] + '_' + i)
                        .getBoundingClientRect(),
                    xy2 = document
                        .getElementById(cols[x] + obj['scaled'] + '_' + i)
                        .getBoundingClientRect()
                svg.className = 'absolute'
                svg.setAttribute('width', '100%')
                svg.setAttribute('height', '100%')
                svg.id = 'svg_' + x + '_' + i
                // line.setAttribute('x1', xy1.x)
                // line.setAttribute('y1', xy1.y)
                // line.setAttribute('x2', xy2.x)
                // line.setAttribute('y2', xy2.y)
                line.setAttribute('x1', '0')
                line.setAttribute('y1', '0')
                line.setAttribute('x2', '500')
                line.setAttribute('y2', '500')
                line.setAttribute('stroke', 'black')
                line.id = 'line_' + x + '_' + i
                document.getElementById('scaleds').appendChild(svg)
                document.getElementById('svg_' + x + '_' + i).appendChild(line)
*/
