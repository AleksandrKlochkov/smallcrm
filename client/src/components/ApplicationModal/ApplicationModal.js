import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('applicationStore')
@observer class ApplicationModal extends Component {

    componentDidMount() {
        const elems = document.querySelectorAll('select');
        window.M.FormSelect.init(elems);
      
    }
    
    render() {
        const {id, modalRef, closeModal, applicationStore} = this.props
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
                    <form onSubmit={(event)=>applicationStore.submitSaveForm(event)}>
                        <div className="modal-content" style={{width:600}}>
                            <h4>Заявка № {applicationStore.Application._id}</h4>
                            <div className="input-field col s12 xl6">
                                    <p><strong>Название заявки:</strong> {applicationStore.Application.formName}</p>
                                    <p><strong>Тип заявки:</strong> {applicationStore.Application.formTypeApplication}</p>
                                    <p><strong>Дата получения:</strong> {new Date(applicationStore.Application.date).toLocaleDateString()}</p>
                                    <p><strong>Время получения:</strong> {`${new Date(applicationStore.Application.date).getHours()}:${new Date(applicationStore.Application.date).getMinutes()} `}</p>
                                    <hr/>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Название поля</th>
                                            <th>Значение поля</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                            {applicationStore.Application.formFields ? applicationStore.Application.formFields.map((item,index)=> {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>{item.value}</td>
                                                    </tr>
                                                )
                                            }): <tr><td>Имя пусто</td><td>Значение пустое</td></tr>}
                                        </tbody>
                                    </table>
                            </div>
                            <div className="input-field col s12 xl6">
                                <select  name="formStatus" defaultValue={applicationStore.Application.formStatus}>
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
