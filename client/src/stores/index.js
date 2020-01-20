import authStore from './authStore'
import sideBarStore from './sideBarStores'
import siteLayoutStore from './siteLayoutStore'
import contactFormStore from './contactFormStore'
import modalStore from './modalStore'

export default () => {
    return {
      authStore,
      sideBarStore,
      siteLayoutStore,
      contactFormStore,
      modalStore
    };
  }