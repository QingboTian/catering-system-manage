import request from '../utils/request';

export function menuList() {
    return request({
        url: '/api/menu',
        method: 'get'
    });
}