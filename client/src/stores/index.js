import {configure} from 'mobx'
import authStore from './authStore'

configure({enforceActions: 'observer'})


export default () => {
    return {
      authStore
    };
  }