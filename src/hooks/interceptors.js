import axios from "axios"


const api = axios.create({
    baseURL: 'http://localhost:5000', 
})

api.interceptors.request.use((request)=>{
    request.headers.Accept = 'application/json'
    const token =  localStorage.getItem('token')
    if (token) {
        console.log(token);
        request.headers.Authorization = `Bearer ${token}`
    }
    console.log('request send');
  return request
}, (error)=>{
    console.log(error);
    return Promise.reject(error)
})
api.interceptors.response.use((response)=>{
    console.log('got respond');
    return response
}, (error)=>{
    console.log(error);
})

export default api