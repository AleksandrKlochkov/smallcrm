import React, { Component } from 'react'
import {Switch, withRouter, Route, Redirect, Link} from 'react-router-dom'
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

@inject('authStore','sideBarStore', 'siteLayoutStore')
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

    constructor(props) {
        super(props)
        
        this.tapTargetRef = React.createRef()
    }

    componentDidMount() {
        setTimeout(()=>{ this.props.siteLayoutStore.tapTargetInit(this.tapTargetRef.current)}, 100)
    }

    renderTitle() {
        const routes = this.state.sideBarLinks
        const path = this.props.location.pathname
        const candidate = routes.find(i => i.url === path)
        if(candidate){
            return candidate.title
        }
        return ""
 
    }

    render() {
        const {sideBarStore, siteLayoutStore} = this.props
        return (
            <React.Fragment>
                <Navbar />
                <div>
                <Sidebar isToggle={sideBarStore.isToggle} sideBarLinks = {this.state.sideBarLinks}/>
                <main className={`content ${sideBarStore.isToggle? "close" : ""}`}>
                <div className="page-title">
                    <h1>
                        {this.renderTitle()}
                    </h1>
                     <Link to="#" id="menu"  className="waves-effect waves-light btn btn-floating tap-target-info" onClick={() => siteLayoutStore.tapTargetIsOpen()}><i className="material-icons">info</i></Link>
                   
                </div>

                <Switch>
                    <Route exact path="/">
                       <Redirect to="/crm"/>
                    </Route>
                    <Route exact path="/crm">
                        <Home tapTargetRef={this.tapTargetRef} />
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

export default withRouter(SiteLayout)
