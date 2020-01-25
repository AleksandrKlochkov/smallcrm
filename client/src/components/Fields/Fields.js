import React from 'react'
import {toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import Input from '../Input/Input'

const Fields = inject('contactFormStore','modalStore')(observer((props) => {
            const renderFields=()=>{
                const fields = toJS(props.contactFormStore.FieldsForm)
                    if(fields && fields.length !== 0){
                        return fields.map((item, index) => {
                            return (
                                <div key={index} className="fields-editing">
                                        <Input className="col s12 l10 xl8" idx={index} id={item.fieldKey} label={item.fieldLabel} type={'text'} placeholder={item.fieldPlaceholder} disabled={true} hidden={item.fieldHidden}/>
                                        <div className="col s12 l2 xl4">
                                            <button 
                                                onClick={()=>props.contactFormStore.setFieldForm(item.fieldKey)} 
                                                type="button" className="btn waves-effect waves-light btn-small light-blue accent-4" 
                                            >
                                                <i className="material-icons">create</i>
                                            </button>
                                            <button 
                                                onClick={()=>props.contactFormStore.removeFieldForm(item.fieldKey) } 
                                                type="button" 
                                                className="btn btn-small red"
                                            >
                                                <i className="material-icons">delete</i>
                                            </button>
                                        </div>
                                </div>
                            )
                        })
                    }
                return 'Здесь вы увидите добавленные поля'
            }

        return (
            <React.Fragment>
                {renderFields(props.fieldsForm)}
            </React.Fragment>
        )
    })
)

export default Fields

