import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { observer, inject } from 'mobx-react'

@inject('sideBarStore')
@observer class Sidebar extends Component {

    renderLinks() {
        return this.props.sideBarLinks.map((item, index) => {
            return (
                <React.Fragment  key={`${index}_${Math.random()}`} >
                    { item.showSideBar ?
                        <li  key={`${index}_${Math.random()}`}  className="bold">
                            <NavLink exact activeClassName="active" to={item.url} className="waves-effect waves-teal"><i className="small material-icons">{item.icon}</i>
                                {item.title}
                            </NavLink>
                        </li>
                        : null
                    }
                </React.Fragment>
            )
        })
    }

    render() {
        const {sideBarStore} = this.props
        return (
            <ul className={`sidenav sidenav-fixed a-sidenav ${sideBarStore.isToggle ? "close" : ""}`}>
                <h4>Crm</h4>
                {this.renderLinks()}
                <li className="bold last">
                    <NavLink to="/logout" className="waves-effect waves-teal">
                      <i className="small material-icons">exit_to_app</i>
                        Выйти
                    </NavLink>
                </li>
            </ul>
        )
    }
}

export default Sidebar
