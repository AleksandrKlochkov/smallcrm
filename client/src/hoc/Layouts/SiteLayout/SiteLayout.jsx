import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Sidebar from '../../../components/Sidebar/Sidebar'
import Logout from '../../../components/Logout/Logout'

import Overwiew from '../../../pages/Overview/Overview'



export default class SiteLayout extends Component {
    render() {
        return (
            <React.Fragment>
                <Sidebar/>
                <main className="content">
                {/* <div className="page-title">
                    <h4>
                        Обзор за вчера (09.04.2018)
                        <i className="material-icons black-text pointer" id="dashboard-info">info_outline</i>
                    </h4>
                </div> */}

                <Switch>
                    <Route exact path="/">
                       <Redirect to="/overwiew"/>
                    </Route>
                    <Route path="/overwiew">
                        <Overwiew />
                    </Route>
                    <Route path="/logout" component={Logout} />
                </Switch>
                </main>
             
            
            <a id="menu" className="waves-effect waves-light btn btn-floating"><i className="material-icons">info</i></a>
            
            <div className="tap-target" data-target="menu">
                <div className="tap-target-content">
                    <h5>Зачем нужна эта страница?</h5>
                    <p>Страница “Обзор” покажет динамику продаж за предыдущий день. Сравнение со средним значениями поможет вам понять, как идут дела у Вашего бизнеса.</p>
                </div>
            </div>
            
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red">
                    <i className="large material-icons">add</i>
                </a>
                <ul>
                    <li><a className="btn-floating green"><i className="material-icons">assignment</i></a></li>
                    <li><a className="btn-floating blue"><i className="material-icons">list</i></a></li>
                </ul>
            </div>
        </React.Fragment>
        )
    }
}
