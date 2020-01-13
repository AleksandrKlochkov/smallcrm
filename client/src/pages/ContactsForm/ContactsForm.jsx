import React, { Component } from 'react'
import {toJS } from 'mobx'
import { inject, observer} from 'mobx-react'
import {Link, withRouter, Switch, Route} from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import noimages from '../../shared/images/noimages.png'

@inject('contactFormStore')
@observer class ContactsForm extends Component {

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
        const {contactFormStore} = this.props
        return (
            <div className="contact-form-pages">
                 <Breadcrumbs prevPage={{url:'/contacts', title: 'Контакт центр'}}title={'Готовые формы'}/>
                <div className="contact-form-btn">
                    <Link to="/contacts/contact_form/add_form">
                        <button className="waves-effect waves-light btn grey darken-1">Добавить форму</button>
                    </Link>
                </div>
                <div className="contact-form">
                    <Switch>
                        <Route exact path="/contacts/contact_form/">
                        <div className="row">
                            {this.renderCardForms(toJS(contactFormStore.arrForms))}
                        </div>
                        </Route>
                        <Route path="/contacts/contact_form/add_form">
                        <div className="row">
                            <div className="col s12 l6 xl6">
                                <div className="input-field">
                                    <input type="file" hidden />
                                    <label htmlFor="">Изображение для формы</label>
                                </div>
                                <div className="form-img-box">
                                    <div className="col s12 center m45_0">
                                            <img className="responsive-img" style={{height: "200px"}} src={noimages} />
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
                                    <textarea id="formDescription" type="text" name="formUrlSite" required></textarea>
                                    <label htmlFor="formDescription">URL-сайта</label>
                                </div>

                                <div className="form-button-box">
                                    <button className="waves-effect waves-light btn" type="submit">
                                        <i class="material-icons left">save</i>
                                        Сохранить изменения
                                    </button>
                                </div>

                            </div>
                        </div>

                        </Route>
                    </Switch>
                 
                    {/* <div className="row">
                        <div className="col xl6">
                            <form action="/">
                                Добавьте поля формы     
                            </form>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default withRouter(ContactsForm)
