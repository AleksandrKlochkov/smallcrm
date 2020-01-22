import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import InputUI from '../UI/InputUI/InputUI'
import SelectUI from '../UI/SelectUI/SelectUI'
import Textarea from '../UI/TextareaUI/TextareaUI'

@inject('contactFormStore')
@observer class FormGenerate extends Component {

    componentDidMount(){
     
    }

    renderFormGenerate() {
        const {contactFormStore} = this.props

        return contactFormStore.FieldsForm.map((item,index) => {

            switch(item.fieldSelection){
                case 'input':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                        />
                    )
                case 'select':
                    return (
                        <SelectUI 
                            key={item.fieldKey+`${index}`}
                            {...item}
                        />
                    )
                case 'textarea':
                    return (
                       <Textarea 
                            key={item.fieldKey+`${index}`}
                            {...item}
                       />
                )
                default:
                    return ''
            }

             })
             
    }

    render() {
        const {contactFormStore} = this.props
        return (
            <div>
                <form action="#" method="POST" style={{border: "1px solid rgb(154, 154, 154)", width: "100%", padding:20}} noValidate>
                    <div>
                        <h2 style={{color:"#222d32", fontSize: "18px", padding: " 0 0 15px 0", margin: "10px 0", fontWeight: 600, textTransform: "uppercase", }}>{contactFormStore.TitleForm ? contactFormStore.TitleForm : 'Здесь будет заголовок'}</h2>  
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
