import React from 'react'
import './InputUI.css'

 const InputUI = props => {

    return (
        <div className="InputUI">
            {props.fieldLabel ? <label className="active" htmlFor={props.fieldKey}>{props.fieldLabel || ""}</label> : null}
            <input
             id={'_'+props.fieldKey} 
             type={props.fieldType || 'text'} 
             name={props.fieldName || `fields${props.idx}`} 
             placeholder={props.fieldPlaceholder || ""} 
            />
            <span className="error">error</span>
        </div>
    )
}

export default InputUI
