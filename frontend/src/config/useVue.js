import Vue from 'vue'
import interceptor from '@/plugins/axios/interceptor'
import Notification from '@mathieustan/vue-notification';
import VueSimpleAlert from "vue-simple-alert";
import VueTheMask from 'vue-the-mask'
import VeeValidate from "vee-validate";
// import VeeValidateMessagesBR from "vee-validate/dist/locale/pt_BR";

// import dictionary from '@/plugins/vee-validate/dictionary'

interceptor()

Vue.use(Notification, {
    breakpoints: {
        480: {
            top: true,
            right: true
        }
    }
});

Vue.use(VueTheMask)

Vue.use(VueSimpleAlert, { reverseButtons: true, cancelButtonText: 'Cancelar' });

Vue.use(VeeValidate);

