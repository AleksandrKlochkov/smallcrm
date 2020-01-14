import React, { Component } from 'react'
import {toJS } from 'mobx'
import { inject, observer} from 'mobx-react'
import {Link, withRouter, Switch, Route} from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import noimages from '../../shared/images/noimages.png'

@inject('contactFormStore')
@observer class ContactsForm extends Component {

    state = {
        formFields: [
            // {
            //     key: 134,
            //     label: 'Введите имя',
            //     placeholder: 'Введите сообщение',
            //     type: 'text',
            //     title: 'Имя',
            //     name: 'name',
            //     hidden: false
            // }            
        ]
    }

    constructor(props) {
        super(props)

        this.modalRef = React.createRef()
    }

    submitHandler(event) {
        event.preventDefault()
        const formFields = this.state.formFields
        const formData = new FormData(event.target)

        const elem = {
                key: Math.random().toString().replace(/./g,""),
                label: formData.get('nameFiels1'),
                placeholder: 'Введите сообщение',
                type: 'text',
                title: formData.get('nameFiels1'),
                name: formData.get('nameFiels2'),
                hidden: false
        } 
        formFields.push(elem)
        this.setState({
            formFields
        })
        
    }

    componentDidMount() {
       
        setTimeout(() => {
            this.props.contactFormStore.modalInit(this.modalRef.current)
        }, 100)
    }

    renderCardForms(forms) {
         if(forms && forms.length !==0 ){
             return forms.map((item,index) => {
                return (
                    <div  key={`${index}_${Math.random()}`} className="col xl3 l4 m6 s12">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                            <Link to="/contacts/contact_form">
                                <div className="card-img teal accent-3">
                                    <i className="large material-icons">contact_mail</i>
                                </div>
                            </Link>
                            </div>
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">{item.formName}<i className="material-icons right">more_vert</i></span>
                                <p><Link to="/contacts/contact_form">Перейти...</Link></p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">{item.formName}<i className="material-icons right">close</i></span>
                                <p>{item.formDescription}</p>
                            </div>
                        </div>
                    </div>
                )
             })
         }



        return "Нет созданных форм, добавьте новую форму."
    }

    render() {
        console.log(this.props)
        const {contactFormStore, history} = this.props
        return (
            <div className="contact-form-pages">
                 <Breadcrumbs prevPage={{url:'/contacts', title: 'Контакт центр'}}title={'Готовые формы'}/>
                 { history.location.search === "" ?
                    <div className="contact-form-btn">
                        <Link to="/contacts/contact_form/add_form?action=add">
                            <button className="waves-effect waves-light btn grey darken-1">Добавить форму</button>
                        </Link>
                    </div> : null
                 }
                <div className="contact-form">
                    <Switch>
                        <Route exact path="/contacts/contact_form/">
                            <div className="row">
                                {this.renderCardForms(toJS(contactFormStore.arrForms))}
                            </div>
                        </Route>
                        <Route path="/contacts/contact_form/add_form">
                        <div className="row">
                            <form action="#">
                                <div className="col s12 l6 xl6">
                                    <div className="input-field">
                                        <input type="file" hidden />
                                        <label htmlFor="">Изображение для формы</label>
                                    </div>
                                    <div className="form-img-box">
                                        <div className="col s12 center m45_0">
                                                <img className="responsive-img" style={{height: "200px"}} src={noimages} alt="images forms" />
                                        </div>
                                        <div className="form-button-box">
                                            <button className="waves-effect waves-light btn orange lighten-2 mb2" type="button">
                                                <i className="material-icons left">backup</i>
                                                Загрузить изображение
                                            </button>
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <input id="formName" type="text" name="formName" required/>
                                        <label htmlFor="name">Название формы</label>
                                    </div>

                                    <div className="input-field">
                                        <input id="formTitle" type="text" name="formTitle" required/>
                                        <label htmlFor="title">Заголовок формы</label>
                                    </div>

                                    <div className="input-field">
                                        <input id="formUrlSite" type="text" name="formUrlSite" required/>
                                        <label htmlFor="formUrlSite">URL-сайта</label>
                                    </div>

                                    <div className="input-field">
                                        <input id="formDescription" type="text" name="formDescription" required/>
                                        <label htmlFor="formDescription">Краткое описание</label>
                                    </div>

                                    <div className="form-button-box">
                                        <button className="waves-effect waves-light btn" type="submit">
                                            <i className="material-icons left">save</i>
                                            Сохранить изменения
                                        </button>
                                    </div>
                                </div>
                               
                            </form>
                            <div className="col s12 l6 xl6 border">
                                    <div className="generate-form-box">
                                        <h5>Создание формы</h5>
                                        <form style={{border: "2px solid  #26a69a", width: "100%", maxWidth:640, padding:20, borderRadius: 5}}>
                                            <div>
                                                <h2 style={{color: "#26a69a", fontSize: "18px", padding: " 0 0 15px 0", margin: "10px 0"}}>Обратная связь</h2>  
                                            </div>
                                       
                                            <div className="fields-editing" style={{marginBottom: "10px"}}>
                                                <button type="button" className="btn btn-small green modal-trigger" href="#modal1">
                                                    <i className="material-icons">add</i>
                                                </button> 
                                            </div>

                                 
                                            {this.state.formFields.map((item,index) => {
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
                                            }
                                           
                                            <button className="waves-effect waves-light btn" type="submit">
                                                Отправить
                                            </button>
                                        </form>
                                    </div>
                                </div>
                        </div>

                        </Route>
                    </Switch>         
              

                <div id="modal1" className="modal"
                    ref={this.modalRef}
                >
                    <form action="#" onSubmit={(event) => this.submitHandler(event)}>
                        <div className="modal-content">
                            <h4>Поле</h4>
                            <p>Здесь вы можите редактировать Поле</p>
                            <div className="input-field">
                                <input id="nameFiels1" type="text" name="nameFiels1"/>
                                <label htmlFor="nameFiels1">Имя поля</label>
                            </div>
                            <div className="input-field">
                                <input id="nameFiels2" type="text" name="nameFiels2"/>
                                <label htmlFor="nameFiels2">Name атрибут</label>
                            </div>
                            {this.state.formFields.length === 0 ?
                                <button type="submit" className="btn btn-small green modal-trigger">
                                        Добавить
                                </button>
                            : null}
                            {this.state.formFields.length !== 0 ?
                            <React.Fragment>
                                <button type="submit" className="btn btn-small yellow">
                                        Отредактировать
                                </button>
                            </React.Fragment>
                            : null}
                        </div>
                       
                    </form>
                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat">Закрыть</button>
                    </div>
                </div>

            </div>
        </div>
        )
    }
}

export default withRouter(ContactsForm)
