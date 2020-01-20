import React, { Component } from 'react'
import Input from '../Input/Input'
import { inject, observer} from 'mobx-react'
import noimages from '../../shared/images/noimages.png'
import ButtonFile from '../ButtonFile/ButtonFile'

@inject('contactFormStore', 'modalStore')
@observer class FormCreate extends Component {

    renderFiels(formFields) {
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

    render() {
        const {contactFormStore} = this.props
        return (
            <div className="row">
                <form action="#" onSubmit={this.props.submitHandlerSave.bind(this)}>
                    <div className="col s12 l6 xl6">
                        <div className="input-field">
                            <label htmlFor="">Изображение для формы</label>
                        </div>
                        <div className="form-img-box">
                            <div className="col s12 center m45_0">
                                    <img
                                    className="responsive-img" 
                                    style={{height: "200px"}} 
                                    src={contactFormStore.ImagesData ? contactFormStore.ImagesData : noimages} 
                                    alt="images forms" />
                            </div>
                            <div className="form-button-box">
                                <ButtonFile onChangeHandlerFile={this.uploadsFiles} />
                            </div>
                        </div>
                        <div className="input-field">
                            <input id="formName" type="text" name="formName" placeholder="Введите название формы" required/>
                            <label htmlFor="name">Название формы</label>
                        </div>
                
                        <div className="input-field">
                            <input id="formUrlSite" type="text" name="formUrlSite" placeholder="Введите URL домена сайта" required/>
                            <label htmlFor="formUrlSite">URL-домен сайта</label>
                        </div>
                        <div className="input-field">
                            <select  id="fieldType" name="fieldType" ref={this.selectRef4} >
                                <option defaultValue="post">POST</option>
                                <option value="get">GET</option>
                
                            </select>
                            <label htmlFor="fieldHidden">Метод отправки</label>
                        </div>
                
                        <div className="input-field">
                            <input id="formDescription" type="text" name="formDescription" placeholder="Введите краткое описание формы" required/>
                            <label htmlFor="formDescription">Краткое описание</label>
                        </div>
                    </div>
                        
                
                    <div className="col s12 l6 xl6">
                        <div className="generate-form-box">
                                <h5>Создание формы</h5>
                                <div className="generate-form-content">
                                    <div className="input-field">
                                        <input id="formTitle" type="text" name="formTitle" placeholder="Введите название формы" required/>
                                        <label htmlFor="title">Заголовок формы</label>
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
                                        <button className="waves-effect waves-light btn light-blue darken-4" type="button">
                                            Отправить
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>
            
                    <div className="col s12 l12 xl12 border">
                        <div className="form-button-box">
                            <button className="waves-effect waves-light btn" type="submit">
                                <i className="material-icons left">save</i>
                                Сохранить изменения
                            </button>
                        </div>
                    </div>
                </form>
            
            </div>
        )
    }
}

export default FormCreate


