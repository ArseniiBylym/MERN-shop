import {decorate, observable, computed, toJS} from 'mobx';

export class Cart {
    cart = [];
    get totalLength() {
        return this.cart.length ? this.cart.length : null;
    }
    get totalPrice() {
        if (!this.cart.length) return null;
        let total = 0;
        toJS(this.cart).forEach(item => {
            const price = item.product.salePrice || item.product.price;
            total += +price * +item.quantity;
        });
        return total;
    }
}

decorate(Cart, {
    cart: observable,
    totalLength: computed,
    totalPrice: computed,
});
