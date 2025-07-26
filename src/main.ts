import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import './style.css'
import App from './App.vue'

import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(ToastService);

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.mount('#app')
