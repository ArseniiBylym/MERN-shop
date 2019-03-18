import {decorate, observable, computed} from 'mobx';

export class User {
    user = null;
    get isAuth() {
        return !!this.user.email;
    }
    dataFetched = false;
    fetchingInProgress = false;
    fetchingError = null;
    loginError = null;
    registerError = null;
}

decorate(User, {
    user: observable,
    isAuth: computed,
    dataFetched: observable,
    fetchingInProgress: observable,
    fetchingError: observable,
    loginError: observable,
    registerError: observable,
});
