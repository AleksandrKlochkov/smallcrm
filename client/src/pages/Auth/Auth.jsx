import React, { Component } from 'react'


export default class Auth extends Component {
    render() {
        return (
            <div className="auth-block">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Войти в систему</span>
                        <div className="input-field">
                            <input id="email" type="email" required />
                            <label htmlFor="email">Email:</label>
                        </div>
                        <div className="input-field">
                            <input id="password" type="password" required />
                            <label htmlFor="password">Пароль:</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="modal-action btn waves-effect">Войти</button>
                    </div>
                </div>
            </div>
        )
    }
}
