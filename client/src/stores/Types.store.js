import {observable, decorate} from 'mobx';

export class Types {
    delliveryTypes = [];
    paymentTypes = [];
    orderStatusTypes = [];
}

decorate(Types, {
    delliveryTypes: observable,
    paymentTypes: observable,
    orderStatusTypes: observable,
});
