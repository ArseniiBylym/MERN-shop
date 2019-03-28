import React, {useState, useEffect, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {toJS} from 'mobx';
import {withRouter} from 'react-router';
import {OrderConfirmList, OrderConfirmForm} from '.';
import {NotificationStore} from '../../../stores';
import {OrderAction, TypesAction} from '../../../actions';

const defaultForm = {
    name: '',
    email: '',
    delliveryAddress: '',
    delliveryService: 1,
    paymentType: 1,
    details: '',
};

export const OrderConfirm = withRouter(
    observer(props => {
        const [form, setForm] = useState(defaultForm);
        const notificationStore = useContext(NotificationStore);

        useEffect(() => {
            if (!props.typesStore.paymentTypes.length) {
                TypesAction.getPaymentTypes();
            }
            if (!props.typesStore.delliveryTypes.length) {
                TypesAction.getDelliveryTypes();
            }
        }, []);

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
                    product: item.product._id,
                    quantity: item.quantity,
                };
            });
            try {
                await OrderAction.postOrder({...form, productList});
                notificationStore.addNotification('New order successfully created!', 'success');
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
                                    delliveryServiceSelect={props.typesStore.delliveryTypes}
                                    paymentTypeSelect={props.typesStore.paymentTypes}
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
