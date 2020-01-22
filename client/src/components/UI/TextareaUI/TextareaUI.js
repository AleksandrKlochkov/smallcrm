import React from 'react'
import './TextareaUI.css'

 const TextareaUI = props => {

    return (
        <div className="TextareaUI">
            {props.fieldLabel ? <label className="active" htmlFor={props.fieldKey}>{props.fieldLabel || ""}</label> : null}
            <textarea
                    id={'_'+props.fieldKey} 
                    type={props.fieldType || 'text'} 
                    name={props.fieldName || `fields${props.idx}`} 
                    placeholder={props.fieldPlaceholder || ""} 
            ></textarea>
            <span className="error">error</span>
        </div>
    )
}

export default TextareaUI