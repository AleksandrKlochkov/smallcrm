import React from 'react'

 const Input = props => {
     const id = props.id || `input_${Math.random().toString().replace(/./g, "")}`
     const name = props.name | `name${id}`
     const classes = ["input-field"]
     if(props.className){
         classes.push(props.className)
     }
    return (
        <div className={classes.join(' ')}>
            <input type={props.type || 'text'} name={name || `fields${props.idx}`} placeholder={props.placeholder || ""} disabled={props.disabled} required/>
            <label className="active" htmlFor={id}>{props.label || ""}</label>
        </div>
    )
}

export default Input
