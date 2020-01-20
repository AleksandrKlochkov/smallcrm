import React, { Component } from 'react'
import Input from '../Input/Input'
import { inject, observer} from 'mobx-react'

@inject('contactFormStore', 'modalStore')
@observer class FormCreate extends Component {

    renderFiels(formFields) {
        console.log(formFields)

        if(formFields && formFields.length !== 0){
            return formFields.map((item, index)=>{
                return (
                    <div key={index} className="fields-editing">
                        <div className="col s8">
                            <Input idx={index} id={item.fieldKey} label={item.fieldLabel} type={item.fieldType} placeholder={item.fieldPlaceholder} disabled={true} hidden={item.fieldHidden}/>
                        </div>
                        <div className="col s4">
                            <button onClick={this.props.editField.bind(this,item.fieldKey)} type="button" className="btn waves-effect waves-light btn-small light-blue accent-4" href="#modal1">
                                <i className="material-icons">create</i>
                            </button>
                            <button onClick={this.props.removeField.bind(this,item.fieldKey)} type="button" className="btn btn-small red">
                                <i className="material-icons">delete</i>
                            </button>
                        </div>
                    </div>
                )
            })
        }

        return 'Здесь вы увидите добавленные поля'
    }

    submiHandler(event) {
        event.preventDefault()
    }

    componentDidUpdate() {
        window.M.updateTextFields();
    }

    render() {
        console.log(this.props)
        return (
            <div className="generate-form-box">
            <h5>Создание формы</h5>
            <form style={{border: "2px solid  #26a69a", width: "100%", maxWidth:640, padding:20}} onSubmit={this.submiHandler.bind(this)}>
                <div>
                    <h2 style={{color: "#26a69a", fontSize: "18px", padding: " 0 0 15px 0", margin: "10px 0"}}>Обратная связь</h2>  
                </div>
                <div className="fields-editing">
                    <button onClick={()=>this.props.modalStore.modalOpen()}  className="waves-effect waves-light btn" type="button">
                    <i className="small material-icons left">add</i>                   
                        Добавить поле
                    </button>
                </div>
                <div className="col s12 margin-tb">
                    {this.renderFiels(this.props.formFields)}
                </div>        
               <div className="fields-editing-btn-box">
                    <button className="waves-effect waves-light btn light-blue darken-4" type="submit">
                        Отправить
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

export default FormCreate
