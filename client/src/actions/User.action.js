import {decorate, action} from 'mobx';
import {UserStore} from '../stores';
import {fetchApi, URL_PATH} from '../api';

export class User {
    getUser = async () => {
        try {
            UserStore.fetchingInProgress = true;
            const response = await fetchApi.get(URL_PATH.USER, true);
            localStorage.setItem('userToken', response.data.token);
            UserStore.user = response.data.user;
            UserStore.fetchingInProgress = false;
            UserStore.dataFetched = true;
        } catch (error) {
            console.log(error);
            localStorage.removeItem('userToken');
            UserStore.fetchingInProgress = false;
            UserStore.dataFetched = true;
            UserStore.user = null;
        }
    };

    loginUser = async data => {
        try {
            UserStore.loginError = null;
            UserStore.fetchingInProgress = true;
            const response = await fetchApi.post(URL_PATH.LOGIN, data);
            localStorage.setItem('userToken', response.data.token);
            UserStore.user = response.data.user;
            UserStore.fetchingInProgress = false;
            UserStore.dataFetched = true;
        } catch (error) {
            console.log(error);
            UserStore.fetchingInProgress = false;
            UserStore.dataFetched = true;
            UserStore.loginError = error.response.data.errors;
        }
    };

    registerUser = async data => {
        try {
            UserStore.registerError = null;
            UserStore.fetchingInProgress = true;
            const response = await fetchApi.post(URL_PATH.SIGNUP, data);
            localStorage.setItem('userToken', response.data.token);
            UserStore.user = response.data.user;
            UserStore.fetchingInProgress = false;
            UserStore.dataFetched = true;
        } catch (error) {
            console.log(error);
            UserStore.fetchingInProgress = false;
            UserStore.dataFetched = true;
            UserStore.registerError = error.response.data.errors;
        }
    };

    logoutUser = () => {
        localStorage.removeItem('userToken');
        UserStore.user = null;
    };
}

decorate(User, {
    getUser: action,
    loginUser: action,
    registerUser: action,
    logoutUser: action,
});
