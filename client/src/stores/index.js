import authStore from './authStore'
import sideBarStore from './sideBarStores'
import siteLayoutStore from './siteLayoutStore'
import contactFormStore from './contactFormStore'

export default () => {
    return {
      authStore,
      sideBarStore,
      siteLayoutStore,
      contactFormStore
    };
  }