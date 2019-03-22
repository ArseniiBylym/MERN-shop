import {decorate, action} from 'mobx';
import uuid from 'uuid';
import {CartStore} from '../stores';
import {fetchApi, URL_PATH} from '../api';

export class Cart {
    initCart = async () => {
        console.log('init cart');
    };
    addToCart = async (product, quantity = 1) => {
        let index = null;
        let prevQuantity;

        CartStore.cart.forEach((item, i) => {
            if (item.product._id === product._id) {
                index = i;
                prevQuantity = +item.quantity;
            }
        });
        if (index !== null) {
            CartStore.cart[index].quantity = prevQuantity + +quantity;
        } else {
            CartStore.cart.push({product, quantity});
        }
    };
    removeFromCart = async productId => {
        const filteredCart = CartStore.cart.filter(item => {
            return item.product._id !== productId;
        });
        CartStore.cart = filteredCart;
        console.log('Remove from cart');
    };
    cartToOrder = async () => {
        console.log('Cart to order');
    };
}

decorate(Cart, {
    initCart: action,
    addToCart: action,
    removeFromCart: action,
    cartToOrder: action,
});
