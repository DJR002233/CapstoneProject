export function TextBox({
    className,
    type = 'text',
    key,
    id,
    name,
    placeholder,
    defaultValue,
    value,
    list,
    readOnly,
    onClick,
    onKeyUp,
}) {
    return (
        <input
            className={className}
            type={type}
            key={key}
            id={id}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            list={list}
            readOnly={readOnly}
            onClick={onClick}
            onKeyUp={onKeyUp}
        />
    )
}
export function TextArea({
    className,
    type = 'text',
    key,
    id,
    name,
    cols,
    rows,
    placeholder,
    defaultValue,
    value,
    readOnly,
}) {
    return (
        <textarea
            className={className}
            type={type}
            key={key}
            id={id}
            name={name}
            cols={cols}
            rows={rows}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            readOnly={readOnly}
        />
    )
}
export function RadioButton({
    className,
    key,
    id,
    name,
    defaultValue,
    defaultChecked,
    checked,
    value,
    readOnly,
}) {
    return (
        <input
            className={className}
            type="radio"
            key={key}
            id={id}
            name={name}
            defaultValue={defaultValue}
            defaultChecked={defaultChecked}
            checked={checked}
            value={value}
            readOnly={readOnly}
        />
    )
}
export function NumericUpDown({
    className,
    keys,
    id,
    name,
    defaultValue,
    min,
    max,
    value,
    readOnly,
}) {
    return (
        <input
            className={className}
            type="number"
            key={keys}
            id={id}
            name={name}
            min={min}
            max={max}
            defaultValue={defaultValue}
            value={value}
            readOnly={readOnly}
        />
    )
}
export function DateTimePicker({
    className,
    key,
    id,
    name,
    min,
    max,
    defaultValue,
    value,
    readOnly,
}) {
    return (
        <input
            className={className}
            type="date"
            key={key}
            id={id}
            name={name}
            min={min}
            max={max}
            defaultValue={defaultValue}
            value={value}
            readOnly={readOnly}
        />
    )
}
export function CheckBox({
    className,
    key,
    id,
    name,
    defaultValue,
    defaultChecked,
    value,
    checked,
    readOnly,
}) {
    return (
        <input
            className={className}
            type="checkbox"
            key={key}
            id={id}
            name={name}
            defaultValue={defaultValue}
            defaultChecked={defaultChecked}
            value={value}
            checked={checked}
            readOnly={readOnly}
        />
    )
}
