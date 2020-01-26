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
          {props.fieldLabel && props.type !== 'hidden' ? <label className="active" htmlFor={props._id}>{props.fieldLabel || ""}</label> : null}
          {props.error ? <span className="helper-text mess-error" data-error="wrong" data-success="right" ></span> : null}
        </div>
    )
}

export default InputUI
