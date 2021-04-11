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