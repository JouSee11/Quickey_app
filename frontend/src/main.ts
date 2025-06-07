import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config"
import Ripple from 'primevue/ripple'
import CustomTheme from '@/presets/customTheme'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css';



const app = createApp(App)

app.use(router)

//setup the ui libary
app.use(PrimeVue, {
    theme: {
        preset: CustomTheme
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
