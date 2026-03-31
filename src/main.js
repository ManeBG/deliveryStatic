import { createApp } from 'vue'
import App    from './App.vue'
import router from './router/index.js'

// Bootstrap JS (popper incluido)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Estilos propios (encima de Bootstrap)
import './assets/styles/main.css'

createApp(App)
  .use(router)
  .mount('#app')
