import request from '../utils/request';

export function list(query) {
    return request({
        url: '/api/dishes/list',
        method: 'get',
        params: query
    });
}

export function create(data) {
    return request({
        url: '/api/dishes/create',
        method: 'post',
        data
    });
}

export function deleteDishes(data) {
    return request({
        url: '/api/dishes/delete?id=' + data,
        method: 'post'
    });
}

export function update(data) {
    return request({
        url: '/api/dishes/update',
        method: 'post',
        data
    });
}

export function online(data) {
    return request({
        url: '/api/dishes/online?id=' + data,
        method: 'post',
    });
}

export function offline(data) {
    return request({
        url: '/api/dishes/offline?id=' + data,
        method: 'post',
    });
}

export function cartList() {
    return request({
        url: '/api/cart/list',
        method: 'get',
    });
}

// 购物车添加或者删除商品
export function addOrReduce(data) {
    return request({
        url: '/api/cart/addOrReduce?dishesId=' + data.dishesId + "&num=" + data.num,
        method: 'post',
    });
}

export function deleteCartItem(data) {
    return request({
        url: '/api/cart/delete?dishesId=' + data,
        method: 'post',
    });
}

export function createOrder(data) {
    return request({
        url: '/api/order/create',
        method: 'post',
        data
    });
}