import {decorate, observable} from 'mobx';

export class Order {
    orders = [];
    get ordersLength() {
        return this.orders.length ? this.orders.length : null;
    }
}

decorate(Order, {
    orders: observable,
});
