import React from 'react'

 const InputUI = props => {

    return (
        <div className="input-field col s12">
          <input 
             id={'_'+props.fieldKey} 
             type={props.type || 'text'} 
             name={props.fieldName || `fields${props.idx}`} 
             placeholder={props.fieldPlaceholder || ""} 
           />
          {props.fieldLabel ? <label className="active" htmlFor={props.fieldKey}>{props.fieldLabel || ""}</label> : null}
          <span className="helper-text mess-error" data-error="wrong" data-success="right"></span>
        </div>
    )
}

export default InputUI
