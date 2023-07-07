import {persistor} from '../app/store';
export const clearPersistedState = () => {
  persistor.purge().then(() => {
    console.log('Purged state ! ✅');
  });
};
