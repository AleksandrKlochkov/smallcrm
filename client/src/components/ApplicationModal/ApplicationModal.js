import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('contactFormStore')
@observer class ApplicationModal extends Component {

    componentDidMount() {
        const elems = document.querySelectorAll('select');
        window.M.FormSelect.init(elems);
    }
    
    render() {
        const {id, modalRef, closeModal, contactFormStore} = this.props
        return (
            <div
            id={id}
            ref={modalRef}
            style={{display:'none'}}
            className="modal_win modal_win_bg modal--align-top modal_win_bg_can_close modal_win_close"
            role="dialog" 
            onClick={(e)=>closeModal(e)}
        >
            <div className="modal_win_dialog">
                <div className="modal_win_content">
                    <form onSubmit={(event)=>contactFormStore.submitSaveForm(event)}>
                        <div className="modal-content" style={{width:600}}>
                            <h4>Заявка №</h4>
                            <div className="input-field col s12 xl6">
                                    <p><strong>Название заявки:</strong> Лендинг</p>
                                    <p><strong>Тип заявки:</strong> Поддержка</p>
                                    <p><strong>Дата получения:</strong> Поддержка</p>
                                    <p><strong>Время получения:</strong> Поддержка</p>
                            </div>
                            <div className="input-field col s12 xl6">
                                <select  id="formStatus" name="formStatus" defaultValue={''}>
                                    <option value="new">Новая заявка</option>
                                    <option value="expired">Просроченная</option>
                                    <option value="inwork">В работе</option>
                                    <option value="completed">Завершенная</option>
                                </select>
                            </div>

                            <div className="modal_win_btn">
                                <button type="submit" className="btn btn-small green waves-effect waves-light">
                                    Обновить
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="modal_win_footer">
                        <button onClick={(e)=>closeModal(e)} className="waves-effect waves-green btn-flat modal_win_close">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default ApplicationModal
