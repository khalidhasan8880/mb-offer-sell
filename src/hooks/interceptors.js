import axios from "axios"


const api = axios.create({
    baseURL: 'http://localhost:5000', 
})

api.interceptors.request.use((request)=>{
    request.headers.Accept = 'application/json'
    const token =  localStorage.getItem('token')
    if (token) {
        request.headers.Authorization = `Bearer ${token}`
    }
  return request
}, (error)=>{
    return Promise.reject(error)
})
api.interceptors.response.use((response)=>{
    return response
}, ()=>{
})


export default api