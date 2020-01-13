import {observable, action, configure, computed} from 'mobx'

configure({ enforceActions: "observed" })

class SideBarStore{
  @observable toggleSide = false;

  @computed get isToggle() {
      return this.toggleSide;
  }

  @action sideBarToggle() {
    this.toggleSide = !this.toggleSide;
  }

}

const sideBarStore = new SideBarStore()

export default sideBarStore

export {SideBarStore}


