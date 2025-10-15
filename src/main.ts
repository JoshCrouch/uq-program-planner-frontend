import KeyFilter from "primevue/keyfilter";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";

import router from "./router";

import "./style.css";
import App from "./App.vue";

const app = createApp(App);

app.directive("keyfilter", KeyFilter);

app.use(ToastService);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(router);

app.mount("#app");
