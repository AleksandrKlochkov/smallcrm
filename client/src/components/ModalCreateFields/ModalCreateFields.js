import React from 'react'

const ModalCreateFields = props => {
    return (
    <div id="modal1" className="modal"
        ref={props.modalRef}
    >
        <form action="#" onSubmit={(event) => props.submitHandler(event)}>
            <div className="modal-content">
                <h4>Поле</h4>
                <p>Здесь вы можите изменять поле</p>

                <div className="input-field">
                    <select>
                        <option value="">Выберите тип поля</option>
                        <option value="1">Текстовое поле</option>
                        <option value="2">Поле для сообщений</option>
                        <option value="3">Поля для выбора</option>
                    </select>
                    <label>Тип поля</label>
                </div>
                <div className="input-field">
                    <input id="fieldTitle" type="text" name="fieldTitle"/>
                    <label htmlFor="fieldTitle">Название поля</label>
                </div>
                <div className="input-field">
                    <input id="fieldName" type="text" name="fieldName"/>
                    <label htmlFor="fieldName">Атрибут поля NAME</label>
                </div>
                <div className="input-field">
                    <input id="fieldType" type="text" name="fieldType"/>
                    <label htmlFor="fieldType">Атрибут поля TYPE</label>
                </div>
                <div className="input-field">
                    <input id="fieldPlaceholder" type="text" name="fieldPlaceholder"/>
                    <label htmlFor="fieldPlaceholder">Атрибут поля PLACEHOLDER</label>
                </div>
                <div className="input-field">
                    <select if="fieldHidden" name="fieldHidden">
                        <option defaultValue="Выберите видимость поля">Выберите видимость поля</option>
                        <option value="1">Открытое</option>
                        <option value="2">Скрытое</option>
                    </select>
                    <label htmlFor="fieldHidden">Отображение поля</label>
                </div>
                {props.formFields.length === 0 ?
                    <button type="submit" className="btn btn-small green modal-trigger">
                            Добавить
                    </button>
                : null}
                {props.formFields.length !== 0 ?
                <React.Fragment>
                    <button type="submit" className="btn btn-small yellow">
                            Отредактировать
                    </button>
                </React.Fragment>
                : null}
            </div>
        </form>
        <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat">Закрыть</button>
        </div>
    </div>
    )
}

export default ModalCreateFields
