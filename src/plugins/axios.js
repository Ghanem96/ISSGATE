import { createApp } from 'vue'
import axios from 'axios'

const app = createApp({})

app.config.globalProperties.$axios = axios

export default app