import React from 'react'
import './SelectUI.css'

 const SelectUI = props => {

    return (
        <div className="SelectUI">
            {props.fieldLabel ? <label className="active" htmlFor={props.fieldKey}>{props.fieldLabel || ""}</label> : null}
            <select>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
            <span className="error">error</span>
        </div>
    )
}

export default SelectUI