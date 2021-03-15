import request from '../utils/request';

export function login(data) {
    return request({
        url: '/sso/login',
        method: 'post',
        data
    });
}

export function logout() {
    return request({
        url: '/sso/logout',
        method: 'post'
    });
}

export function getUserInfo() {
    return request({
        url: 'api/user/getUserInfo',
        method: 'get'
    });
}