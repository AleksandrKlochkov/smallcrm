import React, {Component} from 'react'
import {toJS} from 'mobx'
import { inject, observer } from 'mobx-react'

@inject('contactFormStore', 'modalStore')
@observer class CreateFieldsForm extends Component{

    constructor(props) {
        super(props)
        this.selectRef1 = React.createRef()
        this.selectRef2 = React.createRef()
        this.selectRef3 = React.createRef()
        this.formCreateFieldRef = React.createRef()
        
    }
    
    componentDidMount() {
        window.M.FormSelect.init(this.selectRef1.current);
        window.M.FormSelect.init(this.selectRef2.current);
        window.M.FormSelect.init(this.selectRef3.current);
        window.M.updateTextFields();
    }

    resetForm() {
        const {contactFormStore} = this.props
        contactFormStore.clearFormField()
        this.formCreateFieldRef.current.reset()
        window.M.updateTextFields() 
    }

    renderFields(item) {
        const field = toJS(item)

        return (
            <React.Fragment>
                <div className="input-field col s6">
                    <select id="fieldSelection"
                     ref={this.selectRef1}
                     name="fieldSelection" 
                     defaultValue={field.fieldSelection}
                    >
                        <option value="input" >Ввод текста</option>
                        <option value="textarea">Ввод сообщения</option>
                        <option value="select">Выбор из списка</option>
                    </select>
                    <label htmlFor="fieldSelection">Тип поля</label>
                </div>
                <div className="input-field col s6">
                    <input id="fieldTitle" type="text" name="fieldTitle" placeholder="Введите название поля" defaultValue={field.fieldTitle}/>
                    <label htmlFor="fieldTitle">Название поля</label>
                </div>
                <div className="input-field col s6">
                    <input id="fieldName" type="text" name="fieldName" placeholder="Введите значение атрибута name" defaultValue={field.fieldName}/>
                    <label htmlFor="fieldName">Атрибут поля NAME</label>
                </div>
                <div className="input-field col s6">
                    <select  id="fieldType" name="fieldType" ref={this.selectRef3}  defaultValue={field.fieldType}>
                        <option defaultValue="text">Текст</option>
                        <option value="number">Номер</option>
                        <option value="password">Пароль</option>
                        <option value="checkbox">Флажок(Галочка)</option>
                        <option value="file">Файл</option>
                        <option value="hidden">Скрытое поле</option>
                    </select>
                    <label htmlFor="fieldHidden">Выберите формат поля</label>
                </div>
                <div className="input-field col s6">
                    <input id="fieldPlaceholder" type="text" name="fieldPlaceholder" placeholder="Введите пояснения для поля" defaultValue={field.fieldPlaceholder}/>
                    <label htmlFor="fieldPlaceholder">Пояснительное сообщение</label>
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
