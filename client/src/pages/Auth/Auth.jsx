import React, { Component } from 'react'
import {inject} from 'mobx-react'
import {withRouter} from 'react-router-dom'

 @inject('authStore')
 class Auth extends Component {
    submitHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        this.props.authStore.setHistory(this.props.history)
        this.props.authStore.auth(formData)   
    }

    render() {
        return (
            <div className="auth-block">
                <div className="card">
                    <form onSubmit={this.submitHandler} noValidate>
                        <div className="card-content">
                            <span className="card-title">Войти в систему</span>
                            <div className="input-field">
                                <input id="email" name="email" type="email"/>
                                <label htmlFor="email">Email:</label>
                            </div>
                            <div className="input-field">
                                <input id="password" name="password" type="password" autoComplete="password"/>
                                <label htmlFor="password">Пароль:</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button type="submit" className="modal-action btn waves-effect">Войти</button>
                        </div>
                        </form>
                    </div>
            </div>
        )
    }
}

export default withRouter(Auth)
