import { observable, action, computed } from "mobx"

class ModalStore{
    @observable showModal = false

    @computed get ShowModal() {
        return this.showModal
    }
  
    @action modalClose(e) {
        e.stopPropagation()
        const close = e.target.classList.contains('modal_win_close')
        if(close){
            this.showModal = false
        }
    }

    @action modalOpen() {
        this.showModal = true
    }
}

const modalStore = new ModalStore()

export default modalStore

export {ModalStore}
