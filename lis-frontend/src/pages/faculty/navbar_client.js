'use client'
export default function Settings() {
    return <></>
}
export function toggle_settings() {
    const cb = document.getElementById('gear_icon')
    cb.classList.toggle('hidden')
    // cb.classList.toggle('flex')
    if (typeof window.onclick != 'function')
        window.onclick = function (e) {
            if (e.target.id != 'gear_button') {
                cb.classList.add('hidden')
                // cb.classList.remove('flex')
            }
        }
}
