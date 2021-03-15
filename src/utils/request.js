import axios from 'axios';
import Cookie from 'js-cookie';
import router from "../router/index"

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        var accessToken = Cookie.get('access-token');
        config.headers['token'] = JSON.parse(accessToken).token;
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.data.status == 200) {
            return response.data;
        } else if (response.data.status == 401) {
            router.push('/login');
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
