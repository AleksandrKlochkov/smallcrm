import React, { Component } from 'react'

export default class Sidebar extends Component {
    render() {
        return (
            <ul className="sidenav sidenav-fixed a-sidenav">
                <h4>Newborn</h4>
                <li className="bold active"><a href="#" className="waves-effect waves-orange">Обзор</a></li>
                <li className="bold"><a href="#" className="waves-effect waves-orange">Аналитика</a></li>
                <li className="bold"><a href="#" className="waves-effect waves-orange">История</a></li>
                <li className="bold"><a href="#" className="waves-effect waves-orange">Добавить заказ</a></li>
                <li className="bold "><a href="#" className="waves-effect waves-orange">Ассортимент</a></li>
                <li className="bold last"><a href="#" className="waves-effect waves-orange">Выйти</a></li>
            </ul>
        )
    }
}
