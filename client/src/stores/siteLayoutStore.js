import { observable, action} from 'mobx'

class SiteLayoutStore{
    @observable tapTarget = null;

    tapTargetInit(elem, options = null) {
       if(elem){
             this.tapTarget = window.M.TapTarget.init(elem, options);
       }
    }

    @action('tapTargetIsOpen') 
    tapTargetIsOpen() {
        this.tapTarget.open()
    }
}

const siteLayoutStore = new SiteLayoutStore()

export default siteLayoutStore

export {SiteLayoutStore}