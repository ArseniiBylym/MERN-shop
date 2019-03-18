import {decorate, observable} from 'mobx';

export class Product {
    categories = [];
    categoriesFetching = false;
}

decorate(Product, {
    categories: observable,
    categoriesFetching: observable,
});
