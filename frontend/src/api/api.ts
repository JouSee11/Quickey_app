import axios from "axios";
import { useToast } from 'primevue/usetoast'

export const api = axios.create({
    baseURL: '/api'
})
