import React from 'react'

 const InputUI = props => {
    return (
        <div className="input-field col s12">
          <input 
             id={props._id} 
             type={props.type || 'text'} 
             name={props._id} 
             placeholder={props.fieldPlaceholder || ""} 
           />
          {props.fieldLabel ? <label className="active" htmlFor={props._id}>{props.fieldLabel || ""}</label> : null}
          <span className="helper-text mess-error" data-error="wrong" data-success="right"></span>
        </div>
    )
}

export default InputUI
