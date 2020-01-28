import { observable, action, computed } from "mobx"
import contactFormStore from "./contactFormStore"

class ModalStore{
    @observable formRef = null
    @observable showModal = false
    @observable modalElement = null

    @computed get ShowModal() {
        return this.showModal
    }

    @action setModalElement(elem){
        this.modalElement = elem
        // const fieldType = document.querySelector('[name="fieldType"]')
        // var eventOnChange = new Event('change', { bubbles: true })
        // fieldType.dispatchEvent(eventOnChange)
        this.formRef = elem.querySelector('form')
        this.modalOpen()
    }
  
    @action modalClose() {
        this.showModal = false
        contactFormStore.clearFieldForm()
        contactFormStore.setFieldTypeKey(null)
        if(this.modalElement) {
            this.modalElement.style.display='none'
            this.modalElement = null
        }
        if(this.formRef){   
            this.formRef.reset()
        }
    }

    @action setFormRef(formRef) {
        this.formRef = formRef
    }

    @action modalOpen() {
         this.showModal = true
        if(this.modalElement) {
            this.modalElement.style.display='flex'
        }
    }
}

const modalStore = new ModalStore()

export default modalStore

export {ModalStore}
