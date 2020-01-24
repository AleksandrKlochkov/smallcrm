import React, {Component} from 'react'

 class SelectUI extends Component{

        componentDidMount(){
             const elems = document.querySelectorAll('select');
             console.log(this.props)
             window.M.FormSelect.init(elems);
        }

        render(){
            const selectList = this.props.fieldSelectValues.split(',')
            return (
                <div className="input-field col s12">
                    {this.props.fieldLabel ? <label className="active" htmlFor={this.props.fieldKey}>{this.props.fieldLabel || ""}</label> : null}
                    <select 
                     defaultValue={selectList[0]}
                     >
                        {selectList.map((item, index)=>{
                            return (
                                <option key={index} value={item.value}>{item.title}</option>
                            )
                        })}
                    </select>
                    <span className="helper-text mess-error" data-error="wrong" data-success="right"></span>
                </div>
            )
        }
}

export default SelectUI

