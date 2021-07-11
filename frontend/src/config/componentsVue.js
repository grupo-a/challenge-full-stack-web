import Vue from 'vue'

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Loading from '@/components/Loading/Loading'

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('Loading', Loading)