import React, {Component} from 'react'

 class SelectUI extends Component{

        componentDidMount(){
             const elems = document.querySelectorAll('select');
             window.M.FormSelect.init(elems);
        }

        render(){
            const {_id,fieldSelectValues, fieldLabel} = this.props
            return (
                <div className="input-field col s12">
                    <label className="active" htmlFor={_id}>{fieldLabel || ""}</label>
                    <select 
                     defaultValue={fieldSelectValues[0]}
                     name={_id}
                     >
                        {fieldSelectValues.map((item, index)=>{
                            return (
                                <option key={index} value={item}>{item}</option>
                            )
                        })}
                    </select>
                    {this.props.error ? <span className="helper-text mess-error" data-error="wrong" data-success="right" ></span> : null}
                </div>
            )
        }
}

export default SelectUI

