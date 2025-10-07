// 'use client'

import '@/css/tableBorder.css'
import '@/css/shapes.css'
import '@/css/writing-mode.css'
import '@/css/bg-color.css'
import '@/css/border-color.css'
import '@/css/width.css'

import Scaledscores from '@/pages/faculty/gradesandmappingvisualization/scaledscores'
import Scores from '@/pages/faculty/gradesandmappingvisualization/scores'
import Standardscores from '@/pages/faculty/gradesandmappingvisualization/standardscores'
import { getGradeCookies } from '@/app/_lib/cookies'
import { redirect } from 'next/navigation'
// import { useEffect } from 'react'

export default async function Grades() {
    const data_cookie = await getGradeCookies()
    if (!data_cookie) redirect('/view-grades')
    const data = JSON.parse(data_cookie)
    let name = ''
    if (data.length > 0) {
        name = data[0].first_name + ' ' + data[0].last_name + data[0].suffix
        if (data[0].middle_name)
            name =
                data[0].first_name +
                ' ' +
                data[0].middle_name.substring(0, 1) +
                '. ' +
                data[0].last_name +
                data[0].suffix
    }
    return (
        <div className="mx-10 mb-10 mt-8 text-black md:mx-20 lg:mx-32 lg:mt-10">
            <p className="text-xl font-bold">Name: {name}</p>
            <br />
            <Scores data={data} />
            <br />
            <Scaledscores data={data} />
            <br />
            <Standardscores data={data} />
            <br />
        </div>
    )
}
/*

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
}/**/
