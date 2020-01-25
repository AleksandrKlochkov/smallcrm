import React, {Component} from 'react'

 class SelectUI extends Component{

        componentDidMount(){
             const elems = document.querySelectorAll('select');
             window.M.FormSelect.init(elems);
        }

        render(){
            return (
                <div className="input-field col s12">
                    <label className="active" htmlFor={this.props.fieldKey}>{this.props.fieldLabel || ""}</label>
                    <select 
                     defaultValue={this.props.fieldSelectValues[0]}
                     >
                        {this.props.fieldSelectValues.map((item, index)=>{
                            return (
                                <option key={index} value={item}>{item}</option>
                            )
                        })}
                    </select>
                    <span className="helper-text mess-error" data-error="wrong" data-success="right"></span>
                </div>
            )
        }
}

export default SelectUI

