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

    updateOrder = async (orderId, status) => {
        try {
            const result = await fetchApi.put(URL_PATH.ORDER, {orderId, status});
            console.log(result);
            OrderStore.orders = OrderStore.orders.map(item => {
                if (item._id === orderId) {
                    return {
                        ...item,
                        status,
                    };
                }
                return item;
            });
        } catch (error) {
            console.log(error);
        }
    };

    deleteOrder = async id => {
        console.log(id);
        try {
            const result = await fetchApi.delete(`${URL_PATH.ORDER}/${id}`);
            OrderStore.orders = OrderStore.orders.filter(item => {
                return item._id !== id;
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
}

decorate(Order, {
    postOrder: action,
});
