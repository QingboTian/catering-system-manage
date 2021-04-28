import request from '../utils/request';

export function list(query) {
    return request({
        url: '/api/room/list',
        method: 'get',
        params: query
    });
}

export function create(data) {
    return request({
        url: '/api/room/create',
        method: 'post',
        data
    });
}

export function deleteRoom(data) {
    return request({
        url: '/api/room/delete?id=' + data,
        method: 'post'
    });
}