import React, {Fragment} from 'react'
import {toJS} from 'mobx'
import {inject, observer} from 'mobx-react'

const Fields = inject('contactFormStore','modalStore')(observer((props) => {
            const renderFields=()=>{
                const fields = toJS(props.contactFormStore.ItemForm.formFields)
                    if(fields && fields.length !== 0){
                        return fields.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <div key={index} className="fields-editing">
                                            <div className="col s12 l10 xl8">
                                                <p>Название поля: {item.fieldLabel}</p>
                                            </div>
                                            <div className="col s12 l2 xl4">
                                                <button 
                                                    onClick={()=>props.contactFormStore.setFieldForm(item.fieldKey,props.modalCreateFieldsRef.current)} 
                                                    type="button" className="btn waves-effect waves-light btn-small light-blue accent-4" 
                                                >
                                                    <i className="material-icons">create</i>
                                                </button>
                                                <button 
                                                    onClick={()=>props.contactFormStore.removeFormField(item.fieldKey) } 
                                                    type="button" 
                                                    className="btn btn-small red"
                                                >
                                                    <i className="material-icons">delete</i>
                                                </button>
                                            </div>
                                    </div>
                                    {fields.length - 1 !== index ? <hr/>: null}
                                </Fragment>
                            )
                        })
                    }
                return <p style={{padding:'0 15px'}}>Добавьте поля</p>
            }

        return (
            <React.Fragment>
                {renderFields(props.fieldsForm)}
            </React.Fragment>
        )
    })
)

export default Fields

