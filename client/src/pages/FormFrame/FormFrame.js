import React, { Component} from 'react'
import {toJS} from 'mobx'
import { inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'

import InputUI from '../../components/UI/InputUI/InputUI'
import SelectUI from '../../components/UI/SelectUI/SelectUI'
import TextareaUI from '../../components/UI/TextareaUI/TextareaUI'
import CheckboxUI from '../../components/UI/CheckboxUI/CheckboxUI'
import FileUI from '../../components/UI/FileUI/FileUI'
import Loading from '../../components/Loading/Loading'

@inject('frameFormStore')
@observer class FormFrame extends Component {

    componentDidMount() {
        this.props.frameFormStore.fetchForm(this.props.match.params.id)
        window.M.updateTextFields()
    }

    renderFormGenerate() {
        const {frameFormStore} = this.props
        const fields = toJS(frameFormStore.Form.formFields)
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
        const {frameFormStore} = this.props
        console.log(toJS(frameFormStore.Form))
        return (
            <div className="frame-container">
                <div className="form-generate">
                    {frameFormStore.Loading ? <Loading /> :
                        <form action="#" method="POST" >
                            <div>
                                <h2 style={{color:"#222d32", fontSize: "18px", margin: "10px 0", fontWeight: 600, textTransform: "uppercase", }}>{frameFormStore.Form.formTitle}</h2>  
                            </div>
                            <hr/>
                            <div className="message-form success">
                                <p>{frameFormStore.Form.formSuccessMessages}</p>
                            </div>
                            <div className="row">
                                {this.renderFormGenerate()}
                                <div className="input-field col">
                                    <button className="waves-effect waves-light btn" type="submit">
                                        Отправить
                                    </button>
                                </div>    
                            </div>
                        </form>
                    }
                </div>
                </div>
        )
    }
}

export default withRouter(FormFrame)
