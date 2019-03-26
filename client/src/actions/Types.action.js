import {decorate, action, runInAction} from 'mobx';
import {TypesStore} from '../stores';
import {fetchApi, URL_PATH} from '../api';

export class Types {
    getOrderStatusTypes = async () => {
        try {
            const types = (await fetchApi.get(URL_PATH.ORDER_STATUS_TYPES)).data;
            runInAction(() => {
                TypesStore.orderStatusTypes = types;
            });
        } catch (error) {
            console.log(error);
        }
    };

    getPaymentTypes = async () => {
        try {
            const types = (await fetchApi.get(URL_PATH.PAYMENT_TYPES)).data;
            runInAction(() => {
                TypesStore.paymentTypes = types;
            });
        } catch (error) {
            console.log(error);
        }
    };

    getDelliveryTypes = async () => {
        try {
            const types = (await fetchApi.get(URL_PATH.DELLIVERY_TYPES)).data;
            runInAction(() => {
                TypesStore.delliveryTypes = types;
            });
        } catch (error) {
            console.log(error);
        }
    };
}

decorate(Types, {
    getOrderStatusTypes: action,
    getPaymentTypes: action,
    getDelliveryTypes: action,
});
