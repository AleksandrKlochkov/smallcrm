import React, { Component, Fragment } from 'react'
import {toJS} from 'mobx'
import { inject, observer} from 'mobx-react'
import noimages from '../../shared/images/noimages.png'
import ButtonFile from '../ButtonFile/ButtonFile'
import FormGenerate from '../FormGenerate/FormGenerate'
import Fields from '../Fields/Fields'

@inject('contactFormStore', 'modalStore')
@observer class FormCreate extends Component {
    constructor(props) {
        super(props)
        this.selectRef4 = React.createRef()
    }

    componentDidMount(){
        window.M.updateTextFields()
        window.M.FormSelect.init(this.selectRef4.current)
    }

    render() {
        const {contactFormStore, modalStore} = this.props
        return (
            <Fragment>
            <div className="row">
                <form action="#" onSubmit={(event)=>contactFormStore.submitSaveForm(event)}>
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
                            <input id="formName" type="text" name="formName" placeholder="Введите название формы" required/>
                            <label className="active" htmlFor="name">Название формы</label>
                        </div>
                        <div className="input-field">
                            <input id="formUrlSite" type="text" name="formUrlSite" placeholder="Введите URL домена сайта" required/>
                            <label className="active" htmlFor="formUrlSite">URL-домен сайта</label>
                        </div>
                        <div className="input-field">
                            <select  id="formMethod" name="formMethod" ref={this.selectRef4} >
                                <option value="post" defaultValue="post">POST</option>
                                <option value="get">GET</option>
                            </select>
                            <label htmlFor="fieldHidden">Метод отправки</label>
                        </div>
                
                        <div className="input-field">
                            <input id="formDescription" type="text" name="formDescription" placeholder="Введите краткое описание формы" required/>
                            <label className="active" htmlFor="formDescription">Краткое описание</label>
                        </div>
                    </div>
                        
                    <div className="col s12 l6 xl6">
                        <div className="generate-form-box">
                                <h5>Создание формы</h5>
                                <div className="generate-form-content">
                                    <div className="input-field">
                                        <input 
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
                                            className="materialize-textarea"
                                            id="formSendMessage" 
                                            type="text" 
                                            name="formSendMessage" 
                                            placeholder="Введите сообщение после отправки" 
                                            value={contactFormStore.SendingMessage}
                                            onChange={(event)=>contactFormStore.setSendingMessage(event.target.value)} 
                                            required
                                        >
                                        
                                        </textarea>
                                        <label htmlFor="formSendMessage">Сообщение после отправки</label>
                                    </div>
                                    <div className="fields-editing">
                                        <button onClick={()=>modalStore.modalOpen()}  className="waves-effect waves-light btn" type="button">
                                        <i className="small material-icons left">add</i>                   
                                            Добавить поле
                                        </button>
                                    </div>
                                    <div className="col s12 margin-tb">
                                        <Fields />
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

            <hr/>

            <FormGenerate />
            </Fragment>
        )
    }
}

export default FormCreate







