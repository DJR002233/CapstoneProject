'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

let selected_location_id = null,
    selected_location_name = null

export default function Locations({ available_location = [] }) {
    const router = useRouter()
    const location_buttons = [],
        [btn, setbtn] = useState({ className: '', innerText: '' }),
        [locationLabel, setlocationLabel] = useState()
    for (let i = 0; i < available_location.length; i++) {
        const location = available_location[i]
        if (location.max_registration_forms > location.current_registrations)
            location_buttons.push(
                <button
                    className="mx-auto my-2 w-96 rounded-md border-4 border-blue-400 p-3 text-left text-blue-800"
                    key={i}
                    id={location.location_number}
                    name={location.location_name}
                    onClick={setSelected_location}
                >
                    <strong className="pointer-events-none">
                        {location.location_name}
                    </strong>
                    <br />
                    {location.location_address}
                    <br />
                    <br />
                    <strong className="pointer-events-none">
                        Remaining Slots: {location.current_registrations} /{' '}
                        {location.max_registration_forms}
                    </strong>
                </button>
            )
    }
    for (let i = 0; i < available_location.length; i++) {
        const location = available_location[i]
        if (location.max_registration_forms <= location.current_registrations)
            location_buttons.push(
                <button
                    className="mx-auto my-2 w-96 cursor-default rounded-md border-4 border-blue-400 p-3 text-left text-blue-800 opacity-30"
                    key={i}
                >
                    <strong className="pointer-events-none">
                        {location.location_name}
                    </strong>
                    <br />
                    {location.location_address}
                    <br />
                    <br />
                    <strong className="pointer-events-none">
                        Remaining Slots: {location.current_registrations} /{' '}
                        {location.max_registration_forms}
                    </strong>
                </button>
            )
    } /**/
    // available_location = null
    return (
        <div className="mx-10 mb-20 mt-5 md:mx-20 lg:mx-32">
            <p className="mb-3 text-center text-2xl">
                <strong>Choose Development Center Location</strong>
            </p>
            <div className="flex flex-wrap">{location_buttons}</div>
            <section className="mt-14 flex flex-col">
                <p
                    id="selected_location"
                    className="mx-auto"
                    name="selectedLocation"
                >
                    Selected Location: <strong>{locationLabel}</strong>
                </p>
                <button
                    onClick={go_to_registration_form_onClick}
                    className={btn.className}
                >
                    {btn.innerText}
                </button>
            </section>
        </div>
    )
    function go_to_registration_form_onClick() {
        if (selected_location_id && selected_location_name)
            router.push(
                '/registration-form?' +
                    'location_number=' +
                    selected_location_id +
                    '&location_name=' +
                    selected_location_name
            )
    }
    function setSelected_location(e) {
        if (!e) return false
        const buttonElement = e.target
        if (!buttonElement) return false
        const location_id = buttonElement.id,
            location_name = buttonElement.name
        if (!location_id) return false
        if (selected_location_id)
            if (document.getElementById(selected_location_id))
                document.getElementById(selected_location_id).className =
                    'mx-auto my-2 w-96 rounded-md border-4 border-blue-400 p-3 text-left text-blue-800'
        if (document.getElementById(location_id))
            document.getElementById(location_id).className =
                'mx-auto my-2 w-96 rounded-md border-4 border-blue-600 p-3 text-left text-white bg-blue-600'
        selected_location_id = location_id
        selected_location_name = location_name
        setlocationLabel(location_name)
        setbtn({
            className:
                'text-center mx-auto my-2 w-96 rounded-md border-4 border-blue-600 p-3 text-left text-white bg-blue-600',
            innerText: 'Go to Registration Form',
        })
    }
}
