import React from 'react'

 const CheckboxUI = props => {
     console.log(props)
    const {
        // fieldSelection,
        // fieldKey,
        // fieldLabel,
        // fieldPlaceholder,
        fieldValue
        // fieldType,
        // fieldTitle,
        // fieldSelectValues,
        // fieldName,
        // fieldHidden
    } = props

    return (
        <div className="input-field col s12">
            <p>
                <label>
                    <input type="checkbox" defaultChecked="checked" />
                    <span>{fieldValue}</span>
                </label>
            </p>
        </div>
    )
}

export default CheckboxUI
