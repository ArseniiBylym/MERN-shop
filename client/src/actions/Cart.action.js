import {decorate, action, toJS} from 'mobx';
import {CartStore} from '../stores';
import {fetchApi, URL_PATH} from '../api';

export class Cart {
    initCart = async () => {
        const cartId = localStorage.getItem('cartId');
        if (!cartId) return false;
        try {
            const result = await fetchApi.get(`${URL_PATH.CART}/${cartId}`);
            CartStore.cart = result.data.cart.cart;
        } catch (error) {
            console.log(error);
        }
    };

    addToCart = async (product, quantity = 1) => {
        let index = null;
        let prevQuantity;
        const productItem = {
            product: {
                imageUrl: product.imageUrl,
                name: product.name,
                price: product.price,
                _id: product._id,
            },
            quantity: +quantity,
        };

        CartStore.cart.forEach((item, i) => {
            if (item.product._id === product._id) {
                index = i;
                prevQuantity = +item.quantity;
            }
        });
        if (index !== null) {
            CartStore.cart[index].quantity = prevQuantity + +quantity;
        } else {
            CartStore.cart.push(productItem);
        }

        const cartId = localStorage.getItem('cartId');
        const cart = toJS(CartStore.cart);
        if (cartId) {
            try {
                await fetchApi.put(URL_PATH.CART, {cartId, cart});
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const result = await fetchApi.post(URL_PATH.CART, {cart: [{product: product._id, quantity: +quantity}]});
                localStorage.setItem('cartId', result.data.cartId);
            } catch (error) {
                console.log(error);
            }
        }
    };

    removeFromCart = async productId => {
        const filteredCart = CartStore.cart.filter(item => {
            return item.product._id !== productId;
        });
        CartStore.cart = filteredCart;

        const cartId = localStorage.getItem('cartId');
        const cart = toJS(CartStore.cart);
        if (cart.length) {
            try {
                await fetchApi.put(URL_PATH.CART, {cartId, cart});
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await fetchApi.delete(`${URL_PATH.CART}/${cartId}`);
                localStorage.removeItem('cartId');
            } catch (error) {
                console.log(error);
            }
        }

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
