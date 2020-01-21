import { observable, action, computed } from "mobx"
import contactFormStore from "./contactFormStore"


class ModalStore{
    @observable formRef = null
    @observable showModal = false

    @computed get ShowModal() {
        return this.showModal
    }
  
    @action modalClose() {
        this.showModal = false
        contactFormStore.clearFieldForm()
        if(this.formRef){
            this.formRef.reset()
        }
    }

    @action setFormRef(formRef) {
        this.formRef = formRef
    }

    @action modalOpen() {
        this.showModal = true
    }
}

const modalStore = new ModalStore()

export default modalStore

export {ModalStore}
