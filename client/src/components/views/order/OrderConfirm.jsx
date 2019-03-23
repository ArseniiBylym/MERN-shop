import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {toJS} from 'mobx';
import {withRouter} from 'react-router';
import {OrderConfirmList, OrderConfirmForm} from '.';
import {OrderAction, CartAction} from '../../../actions';

const defaultForm = {
    name: '',
    email: '',
    delliveryAddress: '',
    delliveryService: 1,
    paymentType: 1,
    details: '',
};

const delliveryServiceSelect = [{name: 'Ukrposhta', value: 1}, {name: 'Nova Poshta', value: 2}];
const paymentTypeSelect = [{name: 'Privat 24', value: 1}, {name: 'After receiving', value: 2}];

export const OrderConfirm = withRouter(
    observer(props => {
        const [form, setForm] = useState(defaultForm);

        useEffect(() => {
            if (props.userStore.user) {
                setForm({
                    ...form,
                    name: props.userStore.user.name,
                    email: props.userStore.user.email,
                });
            }
        }, [props.userStore.user]);

        const onChangeHandler = e => {
            const name = e.target.name;
            const value = e.target.value;
            setForm({
                ...form,
                [name]: value,
            });
        };

        const onKeyUpHandler = e => {
            if (e.keyCode === 13) {
                confirmHandler();
                return false;
            }
        };

        const confirmHandler = async () => {
            const productList = toJS(props.cartStore.cart).map(item => {
                return {
                    _id: item.product._id,
                    quantity: item.quantity,
                };
            });
            try {
                await OrderAction.postOrder({...form, productList});
                props.history.push('/');
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <div className="OrderConfirm container">
                <div className="row">
                    {props.cartStore.totalLength ? (
                        <>
                            <div className="OrderConfirm__list col-12 col-md-6 ">
                                <OrderConfirmList cart={props.cartStore.cart} totalPrice={props.cartStore.totalPrice} />
                            </div>
                            <div className="OrderConfirm__form col-12 col-md-6">
                                <OrderConfirmForm
                                    form={form}
                                    onChange={onChangeHandler}
                                    onKeyUp={onKeyUpHandler}
                                    delliveryServiceSelect={delliveryServiceSelect}
                                    paymentTypeSelect={paymentTypeSelect}
                                    confirmHandler={confirmHandler}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="col-12 h4 mt-3 text-center">Your cart is empty now</div>
                    )}
                </div>
            </div>
        );
    }),
);
