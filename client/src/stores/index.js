import authStore from './authStore'
import sideBarStore from './sideBarStores'
import siteLayoutStore from './siteLayoutStore'
import contactFormStore from './contactFormStore'
import modalStore from './modalStore'
import frameFormStore from './frameFormStore'
import applicationStore from './applicationStore'

export default () => {
    return {
      authStore,
      sideBarStore,
      siteLayoutStore,
      contactFormStore,
      modalStore,
      frameFormStore,
      applicationStore
    };
  }