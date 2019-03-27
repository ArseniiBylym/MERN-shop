import {decorate, observable} from 'mobx';

export class Product {
    categories = [];
    categoriesFetching = false;
    getSubCategories = categoryName => {
        const searchedCategory = this.categories.find(item => {
            return item.categoryName === categoryName;
        });
        if (!searchedCategory) return null;
        return searchedCategory.subCategories.length ? searchedCategory.subCategories : null;
    };

    productList = [];
    productListLength = 0;
    productListFetching = false;

    selectedProduct = null;

    foundList = [];
    foundListVisible = false;
    foundListLength = 0;

    saleProduct = [];
    saleProductLength = 0;
}

decorate(Product, {
    categories: observable,
    categoriesFetching: observable,
    productList: observable,
    productListLength: observable,
    productListFetching: observable,
    selectedProduct: observable,
    foundList: observable,
    foundListVisible: observable,
    foundListLength: observable,
    saleProduct: observable,
    saleProductLength: observable,
});
