'use client'
import { useEffect } from 'react'

const columns_pos = {
        0: 238.6,
        1: 442,
        2: 643,
    },
    rows_pos = {
        160: 68,
        150: 121.5,
        140: 175,
        130: 229.6,
        120: 283.7,
        110: 338,
        100: 392.5,
        90: 446.6,
        80: 500.6,
        70: 552.7,
        60: 608,
        50: 662.5,
        40: 718,
        30: 769.5,
        20: 818.3,
        10: 867,
    }

export default function Standardscores({ data }) {
    useEffect(() => {
        draw()
        if (data) addStandardScores(data)
        // addStandardScores()
    })
    return (
        <>
            <br />
            <h1 className="text-center text-4xl">Standard Scores</h1>
            <br />
            <div className="relative mx-auto w-fit">
                <canvas
                    className="border-2 border-black"
                    id="standardscores"
                    width={780}
                    height={915}
                ></canvas>
                <svg
                    className="absolute top-0 z-10"
                    id="standard_scores_svg"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                ></svg>
            </div>
        </>
    )

    function draw() {
        let image = document.createElement('img')
        image.src = '/pictures/graphs-and-statistics/standard_scores.png'
        image.addEventListener('load', () => {
            const canvas = document.getElementById('standardscores'),
                canvas_bounds = canvas.getBoundingClientRect(),
                ctx = canvas.getContext('2d'),
                xratio = canvas_bounds.width / image.width,
                yratio = canvas_bounds.height / image.height,
                ratio = Math.min(xratio, yratio)
            if (canvas != null) {
                ctx.drawImage(
                    image,
                    (canvas_bounds.width - image.width * ratio) / 2,
                    (canvas_bounds.height - image.height * ratio) / 2,
                    image.width * ratio,
                    image.height * ratio
                )
            }
        })
    }
}
export function addStandardScores(data = [], dataIndex) {
    // console.log(data)
    const svg = document.getElementById('standard_scores_svg'),
        datas = [data[0], data[1], data[2]]
    svg.innerHTML = ''
    let prev_selected_column = null,
        selected_column = null
    for (let i = 0; i < datas.length; i++) {
        if (!datas[i]) break
        const datetime = new Date(datas[i]['created_at']),
            month = datetime.getMonth() + 1,
            day = datetime.getDate(),
            year = datetime.getFullYear(),
            age_months = diff_months(
                new Date(year + '-' + month + '-' + day),
                new Date(datas[i]['date_of_birth'])
            )
        if (age_months <= 32) {
            selected_column = columns_pos[0]
        } else if (age_months <= 48) {
            selected_column = columns_pos[1]
        } else if (age_months <= 60) {
            selected_column = columns_pos[2]
        } else {
            selected_column = columns_pos[2]
        }
        const score_1 = datas[i]['sum_of_standard_score'].toString(),
            x_mark = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'text'
            )
        x_mark.setAttribute('x', selected_column - 5)
        x_mark.setAttribute('y', getYAxis(score_1) + 4.7)
        x_mark.setAttribute('fill', 'black')
        x_mark.setAttribute('stroke', 'black')
        x_mark.setAttribute('id', 'x_mark')
        x_mark.textContent = 'x'
        svg.appendChild(x_mark)
        if (i > 0) {
            const score_2 = datas[i - 1]['sum_of_standard_score'].toString(),
                line = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'line'
                )
            line.setAttribute('x1', selected_column)
            line.setAttribute('y1', getYAxis(score_2))
            line.setAttribute('x2', prev_selected_column)
            line.setAttribute('y2', getYAxis(score_1))
            line.setAttribute('stroke', 'lime')
            line.setAttribute('id', 'line')
            svg.appendChild(line)
        }
        const date_tested = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'text'
        )
        date_tested.setAttribute('x', columns_pos[i] - 30)
        date_tested.setAttribute('y', rows_pos[10] + 20)
        date_tested.setAttribute('fill', 'black')
        date_tested.setAttribute('stroke', 'black')
        date_tested.setAttribute('id', 'x_mark')
        date_tested.textContent = month + '-' + day + '-' + year
        svg.appendChild(date_tested)
        prev_selected_column = selected_column
    }
}
export function resetStandardScores() {
    document.getElementById('standard_scores_svg').innerHTML = ''
}
function getYAxis(score) {
    if (!score) return false
    const key = Object.keys(rows_pos)
    let y = null,
        y_d = 0
    if (score.length >= 3) {
        y = score.substring(0, score.length - 1)
    } else if (score.length == 2) {
        y = score[0]
    } else {
        y = 1
    }
    y += 0
    y_d =
        ((rows_pos[y] - rows_pos[key[key.indexOf(y) - 1]]) / 10) *
        parseInt(score[score.length - 1])
    if (Number.isNaN(y_d)) y_d = 0
    return rows_pos[y] + y_d
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
