import React from 'react'


 const TextareaUI = props => {
    const {fieldKey,fieldTitle, fieldPlaceholder} = props
    return (
        <div className="input-field col s12">
            <textarea 
                id={fieldKey}
                data-length="120"
                placeholder={fieldPlaceholder}
                className="materialize-textarea active" 
                htmlFor={fieldKey}
            >
            </textarea>
            <label  className="active" htmlFor={fieldKey}>{fieldTitle}</label>
            <span className="helper-text mess-error" data-error="wrong" data-success="right"></span>
      </div>
    )
}

export default TextareaUI