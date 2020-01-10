import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'

export default class Navbar extends Component {

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
        return (
            <nav>
                <div className="nav-wrapper grey darken-4">
                    <Link to="/" className="brand-logo">CRM</Link>
                        {this.renderNavbarLinks()}
                </div>
            </nav>
        )
    }
}