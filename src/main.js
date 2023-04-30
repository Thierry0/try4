import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';


Amplify.configure(awsExports);

createApp(App).use(Quasar, quasarUserOptions).use(router).mount('#app')
