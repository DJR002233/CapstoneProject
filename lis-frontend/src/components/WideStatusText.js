'use client'
const fixedClassName =
    'px-2 text-center rounded-md fixed top-0 w-full z-20' + ' '
let color = {
    red: 'border-2 border-red-400 bg-red-300',
    green: 'border-2 border-green-400 bg-green-300',
    yellow: 'border-2 border-yellow-400 bg-yellow-300',
}
export default function WideStatusText() {
    return <p id="statusText" className="" onClick={hide}></p>
}
export function warning(text = '', time = 0) {
    let message = 'Error!',
        timeout = 0
    if (typeof text == 'string') message = text
    if (typeof time == 'number') timeout = time
    const status = document.getElementById('statusText')
    status.className = fixedClassName + color.red
    status.innerText = message
    if (timeout)
        setTimeout(function () {
            hide()
        }, timeout)
}
export function done(text = '', time = 0) {
    let message = 'finished!',
        timeout = 0
    if (typeof text == 'string') message = text
    if (typeof time == 'number') timeout = time
    const status = document.getElementById('statusText')
    status.className = fixedClassName + color.green
    status.innerText = message
    if (timeout)
        setTimeout(function () {
            hide()
        }, timeout)
}
export function inprogress(text = '', time = 0) {
    let message = 'loading...',
        timeout = 0
    if (typeof text == 'string') message = text
    // if (time) timeout = time
    if (typeof time == 'number') timeout = time
    const status = document.getElementById('statusText')
    status.className = fixedClassName + color.yellow
    status.innerText = message
    if (timeout)
        setTimeout(function () {
            hide()
        }, timeout)
}
export function hide(time = 0) {
    let timeout = 0
    if (typeof time == 'number') timeout = time
    if (timeout) {
        setTimeout(function () {
            remove()
        }, timeout)
    } else remove()
    function remove() {
        const status = document.getElementById('statusText')
        if (status) {
            status.className = ''
            status.innerText = ''
        }
    }
}
