import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('contactFormStore')
@observer class FormHtmlCodeModal extends Component {
    copyHandler() {

        //нашли наш контейнер
        var ta = this.codeFormRef
        //производим его выделение
        var range = document.createRange();
        range.selectNode(ta); 
        window.getSelection().addRange(range); 
        
        //пытаемся скопировать текст в буфер обмена
        try { 
            document.execCommand('copy'); 
            window.M.toast({html: `Код скопирован в буфер обмена`})
        } catch(err) { 
            window.M.toast({html: `Ошибка! Повторите попытку`})
        } 
        //очистим выделение текста, чтобы пользователь "не парился"
        window.getSelection().removeAllRanges();
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
                    <div className="modal-content">
                            <h4>Код формы</h4>
                        <div className="code-plaintext">
                            <h5>Скопируйте код</h5>
                            <div className="code-btn">
                                <button onClick={()=>this.copyHandler()} className="waves-effect waves-light btn" type="button"><i className="small material-icons left">content_copy</i>Копировать</button>
                            </div>
                            <pre ref={ref => this.codeFormRef = ref} className="code-plaintext-pre">{contactFormStore.FormHtmlCode}</pre>
                        </div>
                    </div>
                    <div className="modal_win_footer">
                        <button onClick={(e)=>closeModal(e)} className="waves-effect waves-green btn-flat modal_win_close">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default FormHtmlCodeModal
