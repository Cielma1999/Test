import axios from 'axios'
import {ElMessage} from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'
const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000,
})

service.interceptors.request.use(config=>{
    if(localStorage.getItem('token')){
        if(diffTokenTime()){
            store.dispatch('logout')
            return romise.reject(new Error('token 失效'));
        }
    }
    config.headers.Authorization = localStorage.getItem('token');
    return config;
},error=>{
    return Promise.reject(new Error(error));
})

service.interceptors.response.use(res=>{
    const {data ,meta} =res.data;
    if(meta.status===200||meta.status===201){
        return data;
    }else{
        ElMessage.error(meta.msg);
        return Promise.reject(new Error(meta.msg));
    }
},err=>{
    err.response && ElMessage.error(err.response.data);
    return Promise.reject(new Error(err.response.data));
})
export default service