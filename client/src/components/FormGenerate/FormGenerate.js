import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import InputUI from '../UI/InputUI/InputUI'
import SelectUI from '../UI/SelectUI/SelectUI'
import Textarea from '../UI/TextareaUI/TextareaUI'


@inject('contactFormStore')
@observer class FormGenerate extends Component {

    renderFormGenerate() {
        const {contactFormStore} = this.props

        return contactFormStore.FieldsForm.map((item,index) => {

            switch(item.fieldType){
                case 'text':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                            type="text"
                        />
                    )
                case 'number':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                            type="number"
                        />
                    )
                case 'select':
                    return (
                        <SelectUI 
                            key={item.fieldKey+`${index}`}
                            {...item}
                        />
                    )
                case 'checkbox':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                        />
                    )
                case 'file':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                        />
                    )
                case 'hidden':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                        />
                    )
                case 'password':
                    return (
                        <InputUI
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
            <div className="form-generate">
                <div className="form-generate-title">
                    <h5>Визуальное представления формы</h5>
                </div>

                <form action="#" method="POST" style={{border: "1px solid rgb(154, 154, 154)", width: "100%", padding:20, background: '#fff'}} noValidate>
                    <div>
                        <h2 style={{color:"#222d32", fontSize: "18px", margin: "10px 0", fontWeight: 600, textTransform: "uppercase", }}>{contactFormStore.TitleForm ? contactFormStore.TitleForm : 'Здесь будет заголовок'}</h2>  
                    </div>
                    <hr/>
                    <div className="message-form success">
                        <p>{contactFormStore.SendingMessage}</p>
                    </div>
                    <div className="row">
                        {this.renderFormGenerate()}
                    </div>
                    <button className="waves-effect waves-light btn" type="button">
                        Отправить
                    </button>
                </form>
            </div>
        )
    }
}

export default FormGenerate
