import React, {Component} from 'react'

 class SelectUI extends Component{

        componentDidMount(){
             const elems = document.querySelectorAll('select');
             window.M.FormSelect.init(elems);
        }

        render(){
            const selectList = this.props.fieldSelectValues.split(',')
            return (
                <div className="input-field col s12">
                    <label className="active" htmlFor={this.props.fieldKey}>{this.props.fieldLabel || ""}</label>
                    <select 
                     defaultValue={selectList[0]}
                     >
                        {selectList.map((item, index)=>{
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

