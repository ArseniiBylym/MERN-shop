import React from 'react';
import {Textarea, Input, Select} from '../../form';

export const OrderConfirmForm = ({form, onChange, onKeyUp, delliveryServiceSelect, paymentTypeSelect, confirmHandler}) => {
    const isButtonDisabled = () => {
        if (!form.name || !form.email || !form.delliveryAddress) return true;
        return false;
    };

    if (!form) return null;
    return (
        <div className="OrderConfirmForm">
            <div className="text-center my-2">
                <h5>Order details</h5>
                <Input value={form.name} name="name" onChange={onChange} onKeyUp={onKeyUp} labelText="Name" />
                <Input value={form.email} name="email" type="email" onChange={onChange} onKeyUp={onKeyUp} labelText="Email" />
                <Textarea value={form.delliveryAddress} name="delliveryAddress" onChange={onChange} onKeyUp={onKeyUp} labelText="Dellivery address" rows="2" />
                <div className="d-flex justify-content-between">
                    <Select name="delliveryService" selectedValue={form.delliveryService} selectList={delliveryServiceSelect} onChange={onChange} labelText="Dellivery type" />
                    <Select name="paymentType" selectedValue={form.paymentType} selectList={paymentTypeSelect} onChange={onChange} labelText="Payment type" />
                </div>
                <Textarea value={form.details} name="details" onChange={onChange} onKeyUp={onKeyUp} labelText="Details" />
                <button className="w-100 btn btn-primary" onClick={confirmHandler} disabled={isButtonDisabled()}>
                    Confirm
                </button>
            </div>
        </div>
    );
};
