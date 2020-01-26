import React from 'react'


 const TextareaUI = props => {
    const {fieldTitle, fieldPlaceholder, _id} = props
    return (
        <div className="input-field col s12">
            <textarea 
                id={_id}
                data-length="120"
                placeholder={fieldPlaceholder}
                className="materialize-textarea active" 
                htmlFor={_id}
                name={_id}
            >
            </textarea>
            <label  className="active" htmlFor={_id}>{fieldTitle}</label>
            {props.error ? <span className="helper-text mess-error" data-error="wrong" data-success="right" ></span> : null}
      </div>
    )
}

export default TextareaUI