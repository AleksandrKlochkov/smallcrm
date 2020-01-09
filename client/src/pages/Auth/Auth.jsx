import React, { Component } from 'react'

export default class Auth extends Component {

    submitHandler = (event) => {
        event.preventDefault();
        console.log('submit')
    }

    render() {
        return (
            <div className="auth-block">
                    <div className="card">
                    <form onSubmit={this.submitHandler}>
                        <div className="card-content">
                            <span className="card-title">Войти в систему</span>
                            <div className="input-field">
                                <input id="email" type="email"/>
                                <label htmlFor="email">Email:</label>
                            </div>
                            <div className="input-field">
                                <input id="password" type="password"/>
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
