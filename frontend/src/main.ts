import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config"
import Ripple from 'primevue/ripple'
import CustomTheme from '@/presets/customTheme'
// import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css';
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import { AnimateOnScroll } from 'primevue'



const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(ConfirmationService)
app.use(ToastService)
app.directive('animateonscroll', AnimateOnScroll)

//setup the ui libary
app.use(PrimeVue, {
    theme: {
        preset: CustomTheme,
        options: {
            darkModeSelector: '.darkmode'

        }
    },
    ripple: true,
    options: {
        cssLayer:{
            name: 'primevue',
            order: 'app-style, primevue'
        },
        prefix: 'p'
    }
    
    
})

app.mount('#app')
