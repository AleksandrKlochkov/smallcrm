import React, { Component } from 'react'
import Input from '../Input/Input'

class FormCreate extends Component {

    renderFiels(formFields) {
        console.log(formFields)

        if(formFields && formFields.length !== 0){
            return formFields.map((item, index)=>{
                return (
                        <div key={index} className="fields-editing">

                            <div className="col s8">
                                <Input id={item.fieldKey} label={item.fieldLabel} type={item.fieldType} placeholder={item.fieldPlaceholder} hidden={item.fieldHidden}/>
                            </div>
                            <div className="col s4">
                                <button type="button" className="btn btn-small yellow" href="#modal1">
                                    <i className="material-icons">create</i>
                                </button>
                                <button type="button" className="btn btn-small red">
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

    render() {
        return (
            <div className="generate-form-box">
            <h5>Создание формы</h5>
            <form style={{border: "2px solid  #26a69a", width: "100%", maxWidth:640, padding:20}} onSubmit={this.submiHandler.bind(this)}>
                <div>
                    <h2 style={{color: "#26a69a", fontSize: "18px", padding: " 0 0 15px 0", margin: "10px 0"}}>Обратная связь</h2>  
                </div>
           
                <div className="fields-editing">
                    <button className="waves-effect waves-light btn modal-trigger" type="button"  href="#modal1">
                    <i className="small material-icons left">add</i>                   
                        Добавить поле
                    </button>
                </div>

                <div className="col s12 margin-tb">
                    {this.renderFiels(this.props.formFields)}
                </div>        

                {/* {this.props.formFields.map((item,index) => {
                    return (
                        <React.Fragment  key={index}>
                        <div key={index} className="fields-editing">
                            {this.state.formFields.length !== 0 ?
                            <React.Fragment>
                                <button type="button" className="btn btn-small yellow" href="#modal1">
                                    <i className="material-icons">create</i>
                                </button>
                                <button type="button" className="btn btn-small red">
                                    <i className="material-icons">delete</i>
                                </button>
                            </React.Fragment>
                            : null}
                        </div>
                        <div key={index} className="input-field">
                             <input id={item.name} type="text" name={item.name} required/>
                        <label htmlFor={item.name}>{item.title}</label>
                    </div>
                    </React.Fragment>
                    )
                })
                } */}
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
