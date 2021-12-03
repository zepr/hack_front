import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'
import 'c3/c3.css'

const app = createApp(App);
app.use(VuesticPlugin);
app.use(router).mount('#app');
