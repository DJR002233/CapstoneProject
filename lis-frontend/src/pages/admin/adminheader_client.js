'use client'
export default function LocationDropDown({
    locations = [],
    selected_location = 0,
}) {
    const options = []
    if (locations) {
        if (locations.length > 0)
            for (let i = 0; i < locations.length; i++) {
                const location = locations[i]
                options.push(
                    <option
                        key={location.location_number}
                        id={location.location_name}
                        value={location.location_number}
                    >
                        {location.location_name}
                    </option>
                )
            }
    }
    return (
        <>
            <select
                id="admindropdownBox"
                className="h-7 border border-black ps-2"
                defaultValue={selected_location}
                onChange={setselectedlocation}
            >
                {options}
            </select>
        </>
    )
    function setselectedlocation() {
        const ddb = document.getElementById('admindropdownBox')
        const now = new Date(),
            time = now.getTime(),
            expireTime = time + 1000 * 60 * 240
        now.setTime(expireTime)
        document.cookie =
            'selected_location=' +
            ddb.value +
            ';expires=' +
            now.toUTCString() +
            ';Path=/'
        location.reload()
    }
}
export function adminPages() {
    const cb = document.getElementById('admincomboBox')
    cb.classList.toggle('hidden')
    cb.classList.toggle('flex')
    if (typeof window.onclick != 'function')
        window.onclick = function (e) {
            if (e.target.id != 'dropdownBtn') {
                cb.classList.add('hidden')
                cb.classList.remove('flex')
            }
        }
}
