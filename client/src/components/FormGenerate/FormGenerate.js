import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
@inject('contactFormStore')
@observer class FormGenerate extends Component {

    componentDidMount(){
        window.M.updateTextFields()
    }

    renderFormGenerate() {
        const {contactFormStore} = this.props

        return contactFormStore.FieldsForm.map((item,index) => {
            return (
                    <div key={index} className="input-field">
                        <input 
                         id={item.fieldKey+`${index}`} 
                         type={item.fieldType} 
                         name={item.fieldName}
                         placeholder={item.fieldPlaceholder}
                         />
                        <label htmlFor={item.fieldKey+`${index}`}>{item.fieldLabel}</label>
                    </div>
                )
             })
    }

    render() {
        const {contactFormStore} = this.props
        return (
            <div>
                <form action="#" method="POST" style={{border: "2px solid  #26a69a", width: "100%", padding:20, borderRadius: 5}} noValidate>
                    <div>
                        <h2 style={{color: "#26a69a", fontSize: "18px", padding: " 0 0 15px 0", margin: "10px 0"}}>{contactFormStore.TitleForm}</h2>  
                    </div>

                    {this.renderFormGenerate()}
                    <button className="waves-effect waves-light btn" type="submit">
                        Отправить
                    </button>
                </form>
            </div>
        )
    }
}

export default FormGenerate
