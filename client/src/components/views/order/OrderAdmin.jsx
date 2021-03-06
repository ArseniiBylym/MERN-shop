/* eslint-disable indent */
import React, {useState, useEffect, useContext} from 'react';
import moment from 'moment';
import {withRouter} from 'react-router';
import {FaAngleDown} from 'react-icons/fa';
import {OrderAction} from '../../../actions';
import {NotificationStore} from '../../../stores';
import {Select} from '../../form';

export const OrderAdmin = withRouter(props => {
    const {delliveryTypes, paymentTypes, orderStatusTypes} = props.typesStore;

    const [orderStatus, setOrderStatus] = useState('');
    const [statusChanged, setStatusChanged] = useState(false);
    const notificationStore = useContext(NotificationStore);

    useEffect(() => {
        setOrderStatus(props.status);
    }, []);

    const onClickHandler = item => e => {
        props.history.push(`/category/${item.product.category}/${item.product.subCategory}/${item.product._id}`);
    };

    const onChangeHandler = e => {
        setOrderStatus(e.target.value);
        if (!statusChanged) setStatusChanged(true);
    };

    const updateOrderHandler = async () => {
        await OrderAction.updateOrder(props._id, orderStatus);
        notificationStore.addNotification('Order shatus updated', 'success');
        setStatusChanged(false);
    };

    const deleteOrderHandler = async () => {
        await OrderAction.deleteOrder(props._id);
        notificationStore.addNotification('Order was deleted', 'success');
    };

    const getDelliveryService = () => {
        if (!delliveryTypes.length) return null;
        return delliveryTypes.find(item => +item.value === +props.delliveryService).name;
    };

    const getPaymentType = () => {
        if (!paymentTypes.length) return null;
        return paymentTypes.find(item => +item.value === +props.paymentType).name;
    };

    const getOrderList = () => {
        return props.productList.map((item, i) => {
            return (
                <p key={item.product._id} onClick={onClickHandler(item)} className="cursor-pointer">
                    #{i + 1} - {item.product.name} - {item.quantity} x ${item.product.price}
                </p>
            );
        });
    };

    const orderDetails = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h5 className="text-info mb-3">Order info</h5>
                        <p>
                            Customer name: <span className="font-weight-bold">{props.name}</span>
                        </p>
                        <p>
                            Customer email: <span className="font-weight-bold">{props.email}</span>
                        </p>
                        <p>
                            Dellivery address: <span className="font-weight-bold">{props.delliveryAddress}</span>
                        </p>
                        <p>
                            Dellivery service: <span className="font-weight-bold">{getDelliveryService()}</span>
                        </p>
                        <p>
                            Payment type: <span className="font-weight-bold">{getPaymentType()}</span>
                        </p>
                        <p>
                            Order details: <span className="font-weight-bold">{props.details}</span>
                        </p>
                    </div>
                    <div className="col-12 col-md-6">
                        <h5 className="text-info mb-3">Order list</h5>
                        {getOrderList()}
                        <hr />
                        <p>
                            Total order price: <span className="font-weight-bold">$ {getTotalPrice()}</span>
                        </p>
                        <hr />
                        {orderStatus && <Select name="orderStaus" labelText="Order status:" selectList={orderStatusTypes} selectedValue={orderStatus} onChange={onChangeHandler} />}
                        <div className="d-flex justify-content-between mt-4 w-100">
                            {statusChanged && (
                                <button className="btn btn-outline-info" onClick={updateOrderHandler}>
                                    Update order
                                </button>
                            )}
                            <button className="btn btn-outline-danger ml-auto" onClick={deleteOrderHandler}>
                                Delete order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const getTotalPrice = () => {
        const total = props.productList.reduce((prev, current) => {
            return prev + current.product.price * current.quantity;
        }, 0);
        return total.toFixed(2);
    };

    const getCurrentStatus = () => {
        if (!orderStatusTypes || !orderStatus) return null;
        const status = orderStatusTypes.find(item => +item.value === +orderStatus);
        return status.name;
    };

    return (
        <div className="OrderUse card">
            <div className="card-header row" id={`heading${props.index}`}>
                <div className="col-12 col-md-5">
                    # {+props.index + 1} - {moment(props.createdAt).format('LLL')}
                </div>
                <div className="col-12 col-sm-8 col-md-5">
                    Status: <span className="font-weight-bold">{getCurrentStatus()}</span>
                </div>
                <div
                    className="col-12 col-sm-4 col-md-2 cursor-pointer text-info"
                    data-toggle="collapse"
                    data-target={`#collapse${props.index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${props.index}`}
                >
                    Details <FaAngleDown />
                </div>
            </div>
            <div id={`collapse${props.index}`} className="collapse" aria-labelledby={`heading${props.index}`} data-parent="#orderAdminAccordion">
                <div className="card-body">{orderDetails()}</div>
            </div>
        </div>
    );
});
