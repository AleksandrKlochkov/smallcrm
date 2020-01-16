import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

@inject('authStore','sideBarStore')
@observer class Navbar extends Component {
    renderNavbarLinks = () => {
        const navbarLinks = this.props.navbarLinks
        if(navbarLinks && navbarLinks.length>0){
            return (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {navbarLinks.map((link, index) => <li key={index}><NavLink to={link.path}>{link.title}</NavLink></li>)}
                </ul>
            )
        }

        return ""
    }

    render() {
        const {authStore,sideBarStore} = this.props
        return (
            <nav>
                <div className="nav-wrapper grey darken-4">
                {authStore.IsAuthenticated ? <button className="toggle-sidebar" type="button" onClick={() => sideBarStore.sideBarToggle()}><i className="material-icons">menu</i></button>: null}
                    <Link to="/" className="brand-logo">CRM</Link>
                        {this.renderNavbarLinks()}
                </div>
            </nav>
        )
    }
}

export default Navbar

