import { configure } from 'mobx';
import AppStore from './appStore';

// configure({
//   enforceActions: 'always',
// });

export default () => {
  const appStore = AppStore;
  return {
    appStore
  };
};
