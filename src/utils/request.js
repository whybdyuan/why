import axios from 'axios'

// 创建axios实例
const request = axios.create({
    //baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

//请求拦截器
request.interceptors.request.use(
    config => {
        // 可以在这里添加token等认证信息
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data
    },
    error => {
        // 对响应错误做点什么
        console.error('API Error:', error)
        return Promise.reject(error)
    }
)

export default request

