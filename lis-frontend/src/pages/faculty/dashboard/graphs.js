'use client'
import { hide } from '@/components/WideStatusText'
import Chart from 'chart.js/auto'
import { useEffect } from 'react'
export default function Graphs({ dates = {}, ratio = {}, cur_date = '' }) {
    useEffect(() => {
        lineGraph()
        barGraph()
        hide()
    }, [])
    return (
        <>
            <div className="mb-5 xl:flex">
                <canvas
                    className="mx-auto w-full lg:w-3/4 xl:w-1/2"
                    id="registrations"
                ></canvas>
                <canvas
                    className="mx-auto mt-8 w-full lg:w-3/4 xl:mt-0 xl:w-1/2"
                    id="reg_ratio_en"
                ></canvas>
            </div>
        </>
    )
    function lineGraph() {
        const data = [],
            date = new Date(cur_date),
            months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            days = [
                '(Sun)',
                '(Mon)',
                '(Tue)',
                '(Wed)',
                '(Thur)',
                '(Fri)',
                '(Sat)',
            ]
        date.setDate(date.getDate() - 6)
        for (let i = 0; i < 7; i++) {
            const row = {},
                formatted_date =
                    date.getFullYear() +
                    '-' +
                    (date.getMonth() + 1) +
                    '-' +
                    date.getDate(),
                reformatted_date = new Date(formatted_date)
            row['date'] =
                months[reformatted_date.getMonth()] +
                '-' +
                reformatted_date.getDate() +
                ' ' +
                days[reformatted_date.getDay()]
            row['count'] = 0
            for (let x = 0; x < dates.length; x++) {
                const hasDate = new Date(dates[x]['date']),
                    formatted_hasdate =
                        hasDate.getFullYear() +
                        '-' +
                        (hasDate.getMonth() + 1) +
                        '-' +
                        hasDate.getDate()
                if (formatted_date == formatted_hasdate) {
                    row['count'] = dates[x]['count']
                    break
                }
            }
            data.push(row)
            date.setDate(date.getDate() + 1)
            // console.log(cur_date)
        }
        const chartID = document.getElementById('registrations'),
            chartStatus = Chart.getChart(chartID.id)
        if (chartStatus != undefined) chartStatus.destroy()
        const lineChart = new Chart(chartID, {
            type: 'line',
            data: {
                labels: data.map((row) => row.date),
                datasets: [
                    {
                        label: 'Number of registrations this day',
                        data: data.map((row) => row.count),
                    },
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
            },
        })
    }
    function barGraph() {
        // console.log(ratio)
        // return true
        const chartID = document.getElementById('reg_ratio_en'),
            chartStatus = Chart.getChart(chartID.id)
        if (chartStatus != undefined) chartStatus.destroy()
        const barChart = new Chart(chartID, {
            type: 'bar',
            data: {
                labels: ['Pending Registration Forms', 'Enrolled Forms'],
                datasets: [
                    {
                        label: 'Number of total forms',
                        data: [ratio.registration_forms, ratio.enrolled],
                    },
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
            },
        })
    }
}
/*
<div className="ms-2 w-1/2 bg-slate-200 py-28 text-center text-black">
            <p className="mb-10 text-xl">
                Location: <strong>{location + ' ' + location_number}</strong>
            </p>
            <div className="flex">
                <section className="mx-auto">
                    <p className={classname.p1}>
                        Number of registrations today: {today}
                    </p>
                    <p className={classname.p1}>
                        Number of pending registration: {pending}
                    </p>
                    <p className={classname.p1}>
                        Number of Enrolled Children: {enrolled}
                    </p>
                </section>
            </div>
        </div>
/**/
