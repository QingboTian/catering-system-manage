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

export function done(data) {
    return request({
        url: '/api/order/done?orderId=' + data,
        method: 'post'
    });
}

export function pay(data) {
    return request({
        url: '/api/order/pay?orderId=' + data,
        method: 'post'
    });
}

export function statistical() {
    return request({
        url: '/api/order/statistical',
        method: 'get'
    });
}