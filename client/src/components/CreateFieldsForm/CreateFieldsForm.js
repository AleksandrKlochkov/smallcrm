import React, {Component} from 'react'
import {toJS} from 'mobx'
import { inject, observer } from 'mobx-react'

@inject('contactFormStore', 'modalStore')
@observer class CreateFieldsForm extends Component{

    constructor(props) {
        super(props)
        this.formCreateFieldRef = React.createRef()
        
    }
    
    componentDidMount() {
        const selects = document.querySelectorAll('select');
        const fieldType = document.querySelector('[name="fieldType"]')
        var eventOnChange = new Event('change', { bubbles: true });
        fieldType.dispatchEvent(eventOnChange);
        window.M.FormSelect.init(selects);
        window.M.updateTextFields();
    }

    renderFields(item) {
        const field = toJS(item)
        const {contactFormStore} = this.props
        window.M.updateTextFields();

        return (
            <React.Fragment>
                <div className="input-field col s12  l6 xl6">
                    <input id="fieldTitle" type="text" name="fieldTitle" placeholder="Введите название поля" defaultValue={field.fieldTitle}/>
                    <label htmlFor="fieldTitle" className="active">Название поля</label>
                </div>
                <div className="input-field col s12  l6 xl6">
                    <select 
                        onChange={(event)=>{contactFormStore.setFieldTypeKey(event.target.value)}}
                        id="fieldType" 
                        name="fieldType" 
                        defaultValue={field.fieldType}
                    >
                        <option value="text">Текстовое поле</option>
                        <option value="select">Выпадающий список</option>
                        <option value="textarea">Сообщение</option>
                        <option value="number">Цифры</option>
                        <option value="checkbox">Флажок(Галочка)</option>
                        <option value="file">Файл</option>
                        <option value="hidden">Скрытое поле</option>
                        <option value="password">Поле с закрытым вводом</option>
                    </select>
                    <label htmlFor="fieldHidden" className="active">Выберите формат поля</label>
                </div>
                { contactFormStore.fieldsType[contactFormStore.FieldTypeKey] === 'select' ? 
                    <div className="input-field col s12 l6 xl6">
                        <input id="fieldSelectValues" type="text" name="fieldSelectValues" placeholder="Введите значения строго через запятую" defaultValue={field.fieldSelectValues}/>
                        <label htmlFor="fieldSelectValues" className="active">Значения для списка</label>
                    </div>
                 : null } 
                <div className="input-field col s12  l6 xl6">
                    <input id="fieldPlaceholder" type="text" name="fieldPlaceholder" placeholder="Введите пояснения для поля" defaultValue={field.fieldPlaceholder}/>
                    <label htmlFor="fieldPlaceholder" className="active">Пояснительное сообщение</label>
                </div>
            </React.Fragment>
        )
    }

    render(){
         const {contactFormStore, id, modalRef, closeModal} = this.props
            return (
                <div
                    id={id}
                    ref={modalRef}
                    className="modal_win modal_win_bg modal--align-top modal_win_bg_can_close modal_win_close"
                    role="dialog" 
                    onClick={(e)=>closeModal(e)}
                >
                    <div className="modal_win_dialog">
                        <div className="modal_win_content">
                            <form action="#" onSubmit={(event)=>this.props.contactFormStore.submitSaveFields(event)} ref={this.formCreateFieldRef}> {/*(event)=>contactFormStore.submitSaveFields(event)*/}
                                <div className="modal-content">
                                    <h4>{Object.keys(contactFormStore.FieldForm).length !==0  ? 'Редактирование поля' : 'Создание поля'}</h4>
                                    
                                        {this.renderFields(contactFormStore.FieldForm)}
                                        <div className="modal_win_btn">
                                            {Object.keys(toJS(contactFormStore.FieldForm)).length !== 0  ?
                                                <button type="submit" className="btn btn-small light-blue accent-4">
                                                        Отредактировать
                                                </button>
                                            : 
                                                <button type="submit" className="btn btn-small green">
                                                        Добавить
                                                </button>
                                            } 
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

export default CreateFieldsForm
