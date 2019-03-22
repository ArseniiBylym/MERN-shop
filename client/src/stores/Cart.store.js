import {decorate, observable} from 'mobx';

export class Cart {
    cart = [];
}

decorate(Cart, {
    cart: observable,
});
