import React from 'react'

 const FileUI = props => {
    const {fieldKey, fieldPlaceholder, _id} = props
    return (
        <div className="file-field input-field col s12">
            <div className="btn">
                <span>File</span>
                <input  id={fieldKey} type="file" name={_id}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path" type="text"  placeholder={fieldPlaceholder} />
            </div>
        </div>
    )
}

export default FileUI