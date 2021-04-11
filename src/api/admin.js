import request from '../utils/request';

export function list(query) {
    return request({
        url: '/api/admin/list',
        method: 'get',
        params: query
    });
}

export function create(data) {
    return request({
        url: '/api/admin/create',
        method: 'post',
        data
    });
}

export function deleteUser(data) {
    return request({
        url: '/api/admin/delete?id=' + data,
        method: 'post'
    });
}