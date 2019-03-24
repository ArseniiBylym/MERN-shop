import {decorate, action} from 'mobx';
import {CartStore, UserStore, OrderStore} from '../stores';
import {fetchApi, URL_PATH} from '../api';

export class Order {
    postOrder = async order => {
        try {
            const cartId = localStorage.getItem('cartId');
            const result = await fetchApi.post(URL_PATH.ORDER, {order, cartId});
            CartStore.cart = [];
            localStorage.removeItem('cartId');
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    getOrder = async () => {
        if (!UserStore.user) return false;
        try {
            const result = await fetchApi.get(URL_PATH.ORDER, true);
            OrderStore.orders = result.data.order;
        } catch (error) {
            console.log(error);
        }
    };
}

decorate(Order, {
    postOrder: action,
});
