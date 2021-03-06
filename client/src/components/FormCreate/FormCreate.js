import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import { inject, observer} from 'mobx-react'
import noimages from '../../shared/images/noimages.png'
import ButtonFile from '../ButtonFile/ButtonFile'
import FormGenerate from '../FormGenerate/FormGenerate'
import Fields from '../Fields/Fields'
import Loading from '../Loading/Loading'

@inject('contactFormStore', 'modalStore')
@observer class FormCreate extends Component {

    componentDidMount(){
        const elems = document.querySelectorAll('select');
        window.M.FormSelect.init(elems);
        this.props.contactFormStore.fetchItemForms(this.props.match.params.id)
        window.M.updateTextFields()
        window.M.updateTextFields()
    }

    render() {
        const {contactFormStore, modalStore} = this.props
        return (
            <Fragment>
                {contactFormStore.Loading ? <Loading /> :
                                 <Fragment>
                 <div className="contact-form-btn">
                   <button onClick={()=>contactFormStore.removeForm()} type="button" className="btn btn-small red"><i className="material-icons left">delete</i>Удалить форму</button>
               </div>

                    <div className="row">
                        <form action="#" onSubmit={(event)=>contactFormStore.submitSaveForm(event, true)}>
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
                                        <ButtonFile onChangeHandlerFile={contactFormStore.uploadsFiles} />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <input defaultValue={contactFormStore.ItemForm.formName} id="formName" type="text" name="formName" placeholder="Введите название формы" required/>
                                    <label className="active" htmlFor="formName">Название формы</label>
                                </div>
                                <div className="input-field">
                                    <select  id="formTypeApplication" name="formTypeApplication" defaultValue={contactFormStore.ItemForm.formTypeApplication}>
                                        <option value="support">Поддержка</option>
                                        <option value="sales">Продажи</option>
                                    </select>
                                    <label htmlFor="formTypeApplication">Тип заявок</label>
                                </div>

                                <div className="input-field">
                                    <input defaultValue={contactFormStore.ItemForm.formNameSite} id="formNameSite" type="text" name="formNameSite" placeholder="Название сайта" required/>
                                    <label  className="active" htmlFor="formNameSite">Название сайта</label>
                                </div>
                                <div className="input-field">
                                    <input defaultValue={contactFormStore.ItemForm.formUrlSite} id="formUrlSite" type="text" name="formUrlSite" placeholder="Введите URL домена сайта" required/>
                                    <label  className="active" htmlFor="formUrlSite">URL-домен сайта</label>
                                </div>
                                <div className="input-field">
                                    <select  id="formMethod" name="formMethod" defaultValue={contactFormStore.ItemForm.formMethod}>
                                        <option value="post">POST</option>
                                        <option value="get">GET</option>
                                    </select>
                                    <label htmlFor="formMethod">Метод отправки</label>
                                </div>
                        
                                <div className="input-field">
                                    <input defaultValue={contactFormStore.ItemForm.formDescription} id="formDescription" type="text" name="formDescription" placeholder="Введите краткое описание формы" required/>
                                    <label className="active" htmlFor="formDescription">Краткое описание</label>
                                </div>
                            </div>
                                
                            <div className="col s12 l6 xl6">
                                <div className="generate-form-box">
                                        <h5>Создание формы</h5>
 
                                        <div className="generate-form-content">
                                        <div className="fields-editing">
                                        <button onClick={()=>contactFormStore.setFormHtmlCode(this.props.formHtmlCodeModal.current, this.props.formGenerateRef.current)}  className="waves-effect waves-light btn orange darken-4" type="button">
                                            <i className="material-icons left">code</i>
                                                Получить код
                                        </button>
                                        </div>
                                            <div className="input-field">
                                                <input 
                                                    defaultValue={contactFormStore.ItemForm.formTitle}
                                                    id="formTitle" 
                                                    type="text" 
                                                    name="formTitle" 
                                                    placeholder="Введите название формы" 
                                                    required
                                                    onChange={(event)=>contactFormStore.setTitleForm(event.target.value)} 
                                                />
                                                <label className="active" htmlFor="formTitle">Заголовок формы</label>
                                            </div>
                                            <div className="input-field">
                                                <textarea 
                                                    defaultValue={contactFormStore.ItemForm.formSendMessage}
                                                    className="materialize-textarea"
                                                    id="formSuccessMessages" 
                                                    type="text" 
                                                    name="formSuccessMessages" 
                                                    placeholder="Введите сообщение после отправки" 
                                                    value={contactFormStore.SendingMessage}
                                                    onChange={(event)=>contactFormStore.setSendingMessage(event.target.value)} 
                                                    required
                                                >
                                                
                                                </textarea>
                                                <label className="active" htmlFor="formSuccessMessages">Сообщение после отправки</label>
                                            </div>
                                            <div className="fields-editing">
                                                <button onClick={()=>modalStore.setModalElement(this.props.modalCreateFieldsRef.current)}  className="waves-effect waves-light btn" type="button">
                                                <i className="small material-icons left">add</i>                   
                                                    Добавить поле
                                                </button>
                                                <button onClick={()=>contactFormStore.removeFormFields()} className="waves-effect waves-light btn light-blue darken-4" type="button">
                                                <i className="small material-icons left">delete</i> 
                                                    Удалить поля
                                                </button>
                                            </div>
                                            <h5>ПОЛЯ ФОРМЫ</h5>
                                            <div className="fields-box">
                                                <Fields modalCreateFieldsRef={this.props.modalCreateFieldsRef} />
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

                    <hr/>
                    <div className="form-generate-title">
                        <h5>Визуальное представления формы</h5>
                    </div>
                    <FormGenerate formGenerateRef={this.props.formGenerateRef}/>
                    </Fragment>
                }
            </Fragment>
        )
    }
}

export default withRouter(FormCreate)







