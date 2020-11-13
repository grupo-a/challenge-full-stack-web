import { StateVuex } from './state';

export default {
  setPageTitle(state: StateVuex, title: string) {
    state.pageTitle = title;
  },
};
