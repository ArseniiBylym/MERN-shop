import axios from 'axios';
import {BASE_URL} from '../utils/config';

export const URL_PATH = {
    USER: `/api/user`,
    LOGIN: `/api/user/login`,
    SIGNUP: `/api/user/signup`,
    PRODUCT_CATEGORY: `/api/product-category`,
};

class FetchApi {
    get = (url, withToken = false, params = undefined) => {
        return axios.get(BASE_URL + url, {
            headers: withToken ? this.authUserHeaders() : this.commonUserHeaders(),
            params,
        });
    };

    post = (url, data) => {
        return axios(BASE_URL + url, {
            method: 'post',
            headers: this.authUserHeaders(),
            data: JSON.stringify(data),
        });
    };

    put = (url, data) => {
        return axios.put(BASE_URL + url, {
            headers: this.authUserHeaders(),
            data: JSON.stringify(data),
        });
    };

    delete = (url, params) => {
        return axios.delete(BASE_URL + url, {
            headers: this.authUserHeaders(),
            params,
        });
    };

    // helpers
    authUserHeaders = () => {
        return {Authorization: `Bearer ${localStorage.getItem(`userToken`)}`, 'Content-Type': `application/json`};
    };
    commonUserHeaders = () => {
        return {'Content-Type': `application/json`};
    };
}

export const fetchApi = new FetchApi();
