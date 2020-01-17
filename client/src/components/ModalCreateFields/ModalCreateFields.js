import React, {Component} from 'react'

class ModalCreateFields extends Component{

    constructor(props) {
        super(props)
        this.selectRef1 = React.createRef()
        this.selectRef2 = React.createRef()
        this.selectRef3 = React.createRef()
    }
    
    componentDidMount() {

        window.M.FormSelect.init(this.selectRef1.current);
        window.M.FormSelect.init(this.selectRef2.current);
        window.M.FormSelect.init(this.selectRef3.current);

    }

    render(){
        return (
            <div id="modal1" className="modal"
                ref={this.props.modalRef}
            >
                <form action="#" onSubmit={this.props.submitHandler.bind(this)}>
                    <div className="modal-content">
                        <h4>Новое поле</h4>

                            <div className="input-field col s6">
                                <select id="fieldSelection"ref={this.selectRef1} name="fieldSelection">
                                    <option defaultValue="input">Текстовое</option>
                                    <option value="textarea">Сообщение</option>
                                    <option value="select">Список</option>
                                </select>
                                <label htmlFor="fieldSelection">Тип поля</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="fieldTitle" type="text" name="fieldTitle" placeholder="Введите название поля"/>
                                <label htmlFor="fieldTitle">Название поля</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="fieldName" type="text" name="fieldName" placeholder="Введите значение атрибута name"/>
                                <label htmlFor="fieldName">Атрибут поля NAME</label>
                            </div>
                            <div className="input-field col s6">
                                <select  id="fieldType" name="fieldType" ref={this.selectRef3}>
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
                                <input id="fieldPlaceholder" type="text" name="fieldPlaceholder" placeholder="Введите значение атрибута placeholder"/>
                                <label htmlFor="fieldPlaceholder">Атрибут поля PLACEHOLDER</label>
                            </div>
                            <div className="input-field col s6">
                                <select if="fieldHidden" name="fieldHidden" ref={this.selectRef2}>
                                    <option defaultValue="true">Открытое</option>
                                    <option value="false">Скрытое</option>
                                </select>
                                <label htmlFor="fieldHidden">Отображение поля</label>
                            </div>
                                <button type="submit" className="btn btn-small green modal-trigger">
                                        Добавить
                                </button>
            

                        {/* {props.formFields.length !== 0 ?
                        <React.Fragment>
                            <button type="submit" className="btn btn-small yellow">
                                    Отредактировать
                            </button>
                        </React.Fragment>
                        : null} */}
                    </div>
                </form>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">Закрыть</button>
                </div>
            </div>
        )
    }
}

export default ModalCreateFields
