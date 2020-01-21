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
                        <option value="input" >Текстовое</option>
                        <option value="textarea">Сообщение</option>
                        <option value="select">Список</option>
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
                        <option defaultValue="text">text</option>
                        <option value="number">number</option>
                        <option value="password">password</option>
                        <option value="checkbox">checkbox</option>
                        <option value="file">file</option>
                        <option value="hidden">hidden</option>
                        <option value="radio">radio</option>
                    </select>
                    <label htmlFor="fieldHidden">Атрибут поля type</label>
                </div>
                <div className="input-field col s6">
                    <input id="fieldPlaceholder" type="text" name="fieldPlaceholder" placeholder="Введите значение атрибута placeholder" defaultValue={field.fieldPlaceholder}/>
                    <label htmlFor="fieldPlaceholder">Атрибут поля PLACEHOLDER</label>
                </div>
                <div className="input-field col s6">
                    <select if="fieldHidden" name="fieldHidden" ref={this.selectRef2} defaultValue={field.fieldHidden}>
                        <option value="true">Открытое</option>
                        <option value="false">Скрытое</option>
                    </select>
                    <label htmlFor="fieldHidden">Отображение поля</label>
                </div>
            </React.Fragment>
        )
    }

    render(){
         const {contactFormStore, id, modalRef, closeModal} = this.props
         console.log(toJS(contactFormStore.FieldForm))
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
