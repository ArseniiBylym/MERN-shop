import {decorate, action} from 'mobx';
import {ProductStore} from '../stores';
import {fetchApi, URL_PATH} from '../api';

export class Product {
    getCategories = async () => {
        ProductStore.categoriesFetching = true;
        try {
            const result = await fetchApi.get(URL_PATH.PRODUCT_CATEGORY);
            ProductStore.categoriesFetching = false;
            ProductStore.categories = result.data.productCategory;
        } catch (error) {
            console.log(error);
            ProductStore.categoriesFetching = false;
            ProductStore.categoriesFetchingError = error.message;
        }
    };

    addCategory = async categoryName => {
        const body = {
            categoryName,
        };
        try {
            const result = await fetchApi.post(URL_PATH.PRODUCT_CATEGORY, body);
            ProductStore.categories.push({categoryName, subCategories: []});
        } catch (error) {
            console.log(error);
        }
    };
}

decorate(Product, {
    getCategories: action,
});
