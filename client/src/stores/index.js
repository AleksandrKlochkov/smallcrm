import authStore from './authStore'
import sideBarStore from './sideBarStores'
import siteLayoutStore from './siteLayoutStore'

export default () => {
    return {
      authStore,
      sideBarStore,
      siteLayoutStore
    };
  }