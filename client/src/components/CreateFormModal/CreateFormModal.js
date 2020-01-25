import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('contactFormStore')
@observer class CreateFromModal extends Component {
    
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
                    <form onSubmit={(event)=>contactFormStore.submitSaveForm(event,false)}> {/*(event)=>contactFormStore.submitSaveFields(event)*/}
                        <div className="modal-content">
                            <h4>Добавление формы</h4>
                            <div className="input-field col s12 xl6">
                                <input id="_formName" type="text" name="formName" placeholder="Введите название формы" />
                                <label htmlFor="_formName" className="active">Название формы*</label>
                            </div>
                            <div className="input-field  col s12 xl6">
                                <input 
                                    id="_formTitle" 
                                    type="text" 
                                    name="formTitle" 
                                    placeholder="Введите заголовок формы" 
                                />
                                <label className="active" htmlFor="_formTitle">Заголовок формы</label>
                            </div>
                            <div className="input-field col s12">
                                <textarea
                                 className="materialize-textarea" 
                                 data-length="50"
                                 id="_formDescription" 
                                 type="text" 
                                 name="formDescription" 
                                 placeholder="Введите краткое описание формы" 
                                 >
                                 </textarea>
                                <label className="active" htmlFor="_formDescription">Краткое описание формы*</label>
                            </div>

                            <div className="file-field input-field col s12 xl6">
                                <div className="btn">
                                    <span>File</span>
                                    <input name="formImages" type="file"/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"/>
                                </div>
                                </div>

                            <div className="input-field col s12 xl6">
                                <p>
                                    <label>
                                        <input type="checkbox" name="autoGenerationFields"/>
                                        <span>Сгенировать поля формы автоматически</span>
                                    </label>
                                </p>
                            </div>
                            <div className="modal_win_btn">
                                <button type="submit" className="btn btn-small green">
                                    Добавить
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

export default CreateFromModal
