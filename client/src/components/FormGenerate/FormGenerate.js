import React, { Component } from 'react'
import {toJS} from 'mobx'
import { inject, observer } from 'mobx-react'

import InputUI from '../UI/InputUI/InputUI'
import SelectUI from '../UI/SelectUI/SelectUI'
import TextareaUI from '../UI/TextareaUI/TextareaUI'
import CheckboxUI from '../UI/CheckboxUI/CheckboxUI'
import FileUI from '../UI/FileUI/FileUI'


@inject('contactFormStore')
@observer class FormGenerate extends Component {

    renderFormGenerate() {
        const {contactFormStore} = this.props
        const fields = toJS(contactFormStore.ItemForm.formFields)
        if(fields && fields.length !== 0){
        return fields.map((item,index) => {

            switch(item.fieldType){
                case 'text':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                            type="text"
                        />
                    )
                case 'email':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                            type="email"
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
                case 'textarea':
                    return (
                        <TextareaUI 
                            key={item.fieldKey+`${index}`}
                            {...item}
                        />
                )
                case 'checkbox':
                    return (
                        <CheckboxUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                        />
                    )
                case 'file':
                    return (
                        <FileUI
                            key={item.fieldKey+`${index}`}
                            {...item}
                        />
                    )
                case 'hidden':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            type="hidden"
                            {...item}
                        />
                    )
                case 'password':
                    return (
                        <InputUI
                            key={item.fieldKey+`${index}`}
                            type="password"
                            {...item}
                        />
                    )
                default:
                    return ''
            }
            })
        }

        return <p style={{padding:'0 15px'}}>Добавьте поля</p>
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
                        <div className="input-field col">
                            <button className="waves-effect waves-light btn" type="button">
                                Отправить
                            </button>
                        </div>    
                    </div>
                </form>
            </div>
        )
    }
}

export default FormGenerate
