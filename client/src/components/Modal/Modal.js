import React, { Component } from 'react'

export default class Modal extends Component {
    
    render() {
        const {id, modalRef} = this.props
        return (
            <div
             id={id}
             className="modal"
             ref={modalRef}
            >
                <div className="modal-content">
                    {this.props.children}
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" href="#!">Закрыть</button>
                </div>
            </div>
        )
    }
}
