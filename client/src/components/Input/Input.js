import React from 'react'

 const Input = props => {
    return (
        <div className="input-field">
            <input id="formTitle" type={props.type || 'text'} name={props.name} placeholder={props.placeholder} required/>
            <label htmlFor="title">{props.label}</label>
        </div>
    )
}


export default Input
