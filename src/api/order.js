import request from '../utils/request';

export function list(query) {
    return request({
        url: '/api/order/list',
        method: 'get',
        params: query
    });
}

export function create(data) {
    return request({
        url: '/api/order/create',
        method: 'post',
        data
    });
}

export function deleteDishes(data) {
    return request({
        url: '/api/order/delete?id=' + data,
        method: 'post'
    });
}