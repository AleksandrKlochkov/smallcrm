import React from 'react'

 const Input = props => {
     const id = props.id || `input_${Math.random().toString().replace(/./g, "")}`
     const name = props.name | `name${id}`
    return (
        <div className="input-field">
            <input id={id} type={props.type || 'text'} name={name || `fields${props.idx}`} placeholder={props.placeholder || ""} disabled={props.disabled} required/>
            <label htmlFor={id}>{props.label || ""}</label>
        </div>
    )
}

export default Input
