import React, { Component } from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Sidebar from '../../../components/Sidebar/Sidebar'
import Logout from '../../../components/Logout/Logout'
import Navbar from '../../../components/Navbar/Navbar'

import Overview from '../../../pages/Overview/Overview'
import Analytics from '../../../pages/Analytics/Analytics'
import Home from '../../../pages/Home/Home'
import History from '../../../pages/History/History'
import Order from '../../../pages/Order/Order'
import Categories from '../../../pages/Categories/Categories'
import Contacts from '../../../pages/Contacts/Contacts'
import NotFound from '../../../pages/NotFound/NotFound'

@inject('authStore','sideBarStore')
@observer class SiteLayout extends Component {
    state = {
        sideBarLinks:[
            {url: '/crm', title: 'CRM', icon: 'business'},
            {url: '/overview', title: 'Обзор', icon: 'dashboard'},
            {url: '/analytics', title: 'Аналитика', icon: 'equalizer'},
            {url: '/history', title: 'История', icon: 'history'},
            {url: '/order', title: 'Добавить заказ', icon: 'library_add'},
            {url: '/categories', title: 'Ассортимент', icon: 'apps'},
            {url: '/contacts', title: 'Контакт центр', icon: 'call'}
          ]
    }

    render() {
        const {sideBarStore} = this.props
        return (
            <React.Fragment>
                <Navbar />
                <div>
                <Sidebar isToggle={sideBarStore.isToggle} sideBarLinks = {this.state.sideBarLinks}/>
                <main className={`content ${sideBarStore.isToggle? "close" : ""}`}>
                {/* <div className="page-title">
                    <h4>
                        Обзор за вчера (09.04.2018)
                        <i className="material-icons black-text pointer" id="dashboard-info">info_outline</i>
                    </h4>
                </div> */}

                <Switch>
                    <Route exact path="/">
                       <Redirect to="/crm"/>
                    </Route>
                    <Route exact path="/crm">
                        <Home />
                    </Route>
                    <Route path="/overview">
                        <Overview />
                    </Route>
                    <Route path="/analytics">
                        <Analytics />
                    </Route>
                    <Route path="/history">
                        <History />
                    </Route>
                    <Route path="/order">
                        <Order />
                    </Route>
                    <Route path="/categories">
                        <Categories />
                    </Route>
                    <Route path="/contacts">
                        <Contacts />
                    </Route>
                    <Route path="/logout" component={Logout} />
                    <Route path="/NotFound" component={NotFound} />
                    <Redirect to="/" />
                </Switch>
                </main>
                </div>
             
            
            <Link to="#" id="menu" className="waves-effect waves-light btn btn-floating"><i className="material-icons">info</i></Link>
            
            <div className="tap-target" data-target="menu">
                <div className="tap-target-content">
                    <h5>Зачем нужна эта страница?</h5>
                    <p>Страница “Обзор” покажет динамику продаж за предыдущий день. Сравнение со средним значениями поможет вам понять, как идут дела у Вашего бизнеса.</p>
                </div>
            </div>
            
            <div className="fixed-action-btn">
                <Link to="#" className="btn-floating btn-large red">
                    <i className="large material-icons">add</i>
                </Link>
                <ul>
                    <li><Link to="#" className="btn-floating green"><i className="material-icons">assignment</i></Link></li>
                    <li><Link to="#" className="btn-floating blue"><i className="material-icons">list</i></Link></li>
                </ul>
            </div>
        </React.Fragment>
        )
    }
}

export default SiteLayout
