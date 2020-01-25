import React from 'react'

 const CheckboxUI = props => {
     console.log(props)
    const {
        _id,
        fieldValue
    } = props

    return (
        <div className="input-field col s12">
            <p>
                <label>
                    <input name={_id} type="checkbox" defaultChecked="checked" />
                    <span>{fieldValue}</span>
                </label>
            </p>
        </div>
    )
}

export default CheckboxUI
