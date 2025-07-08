import axios from "axios";
import { useToast } from 'primevue/usetoast'

export const api = axios.create({
    baseURL: '/api'
})

//when the rate limit is exceeded, show toast
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 429) {
//             const retryAfter = error.response.retryAfter || 60
            
//             try {
//                 // const toast = useToast()    
//                 toast.add({
//                     severity: 'warn',
//                     summary: 'Too many requests',
//                     detail: `Please wait ${retryAfter} seconds. Then start working again`,
//                     life: 4000
//                 })
//             } catch (error) {
//                 console.warn('Toast not available')
//             }
//         }

//         return Promise.reject(error)
//     }
// )