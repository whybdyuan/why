import request from '@/utils/request'

// 用户登录API
export function login(data) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data
    })
}

// 用户登出API
export function logout() {
    return request({
        url: '/api/user/logout',
        method: 'post'
    })
}

// 用户注册API
export function register(data) {
    return request({
        url: '/api/user/register',
        method: 'post',
        data
    })
}

