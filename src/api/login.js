import request from '../utils/request';

export function login(data) {
    return request({
        url: '/sso/login',
        method: 'post',
        data
    });
}
