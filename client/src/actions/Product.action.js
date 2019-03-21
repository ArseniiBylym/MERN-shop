import {decorate, action} from 'mobx';
import {ProductStore, UserStore} from '../stores';
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
            await fetchApi.post(URL_PATH.PRODUCT_CATEGORY, body);
            ProductStore.categories.push({categoryName, subCategories: []});
        } catch (error) {
            console.log(error);
        }
    };

    addSubCategory = async (categoryName, subCategory) => {
        // console.log
        const body = {
            categoryName,
            subCategories: [{name: subCategory.name, image: subCategory.image}],
        };
        try {
            await fetchApi.post(URL_PATH.PRODUCT_CATEGORY, body);
            ProductStore.getSubCategories(categoryName).push(subCategory);
        } catch (error) {
            console.log(error);
        }
    };

    getProductList = async queryParams => {
        ProductStore.productListFetching = true;
        try {
            const result = await fetchApi.get(URL_PATH.PRODUCT, false, queryParams);
            ProductStore.productListFetching = false;
            ProductStore.productList = result.data.products;
            ProductStore.productListLength = result.data.totalCount;
        } catch (error) {
            ProductStore.productListFetching = false;
            console.log(error);
        }
    };

    addProduct = async (category, subCategory, body) => {
        try {
            const result = await fetchApi.post(URL_PATH.PRODUCT, body);
            ProductStore.productList.push(result.data.product);
        } catch (error) {
            console.log(error);
        }
    };

    getProductDetails = async id => {
        try {
            const result = await fetchApi.get(`${URL_PATH.PRODUCT}/${id}`);
            ProductStore.selectedProduct = result.data;
        } catch (error) {
            console.log(error);
        }
    };

    clearProductDetails = () => {
        ProductStore.selectedProduct = null;
    };

    addReview = async data => {
        const body = {
            productId: data.productId,
            comment: {
                text: data.review,
                raiting: data.raiting ? data.raiting : undefined,
            },
        };
        try {
            const result = await fetchApi.put(URL_PATH.PRODUCT_COMMENT, body);
            const review = {...result.data.data};
            review.author = {
                name: UserStore.user.name,
                _id: result.data.data.author,
            };
            ProductStore.selectedProduct.reviews.push(review);
        } catch (error) {
            console.log(error);
        }
    };
}

decorate(Product, {
    getCategories: action,
    addCategory: action,
    addSubCategory: action,
    getProductList: action,
    addProduct: action,
    getProductDetails: action,
    clearProductDetails: action,
    addReview: action,
});
