import request from '../utils/request';

export function list(query) {
    return request({
        url: '/api/appointment/list',
        method: 'get',
        params: query
    });
}

export function roomList(query) {
    return request({
        url: '/api/appointment/room/list',
        method: 'get',
        params: query
    });
}

export function appointment(data) {
    return request({
        url: '/api/appointment',
        method: 'post',
        data
    });
}

export function cancel(data) {
    return request({
        url: '/api/appointment/cancel?id=' + data,
        method: 'post'
    });
}