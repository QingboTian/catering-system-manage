import request from '../utils/request';

export function list(query) {
    return request({
        url: '/api/category/list/group',
        method: 'get',
        params: query
    });
}

export function create(data) {
    return request({
        url: '/api/category/create',
        method: 'post',
        data
    });
}

export function deleteCategory(data) {
    return request({
        url: '/api/category/delete?id=' + data,
        method: 'post'
    });
}