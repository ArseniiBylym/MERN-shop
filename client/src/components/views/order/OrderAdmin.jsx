/* eslint-disable indent */
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {withRouter} from 'react-router';
import {FaAngleDown} from 'react-icons/fa';
import {OrderAction} from '../../../actions';
import {Select} from '../../form';

export const OrderAdmin = withRouter(props => {
    const [orderStatus, setOrderStatus] = useState('');
    const [statusChanged, setStatusChanged] = useState(false);
    useEffect(() => {
        setOrderStatus(props.status);
    }, []);

    const delliveryServiceSelect = [{name: 'Ukrposhta', value: 1}, {name: 'Nova Poshta', value: 2}];
    const paymentTypeSelect = [{name: 'Privat 24', value: 1}, {name: 'After receiving', value: 2}];
    const orderStatusList = [
        {name: 'Order in process', value: 'processing'},
        {name: 'Prepeare for sending', value: 'paid'},
        {name: 'Sent to user', value: 'sent'},
        {name: 'Order completed', value: 'completed'},
        {name: 'Order rejected', value: 'rejected'},
    ];

    const onClickHandler = item => e => {
        props.history.push(`/category/${item._id.category}/${item._id.subCategory}/${item._id._id}`);
    };

    const onChangeHandler = e => {
        setOrderStatus(e.target.value);
        if (!statusChanged) setStatusChanged(true);
    };

    const updateOrderHandler = () => {
        OrderAction.updateOrder(props._id, orderStatus);
    };

    const deleteOrderHandler = () => {
        OrderAction.deleteOrder(props._id);
    };

    const getDelliveryService = () => {
        return delliveryServiceSelect.find(item => item.value === props.delliveryService).name;
    };

    const getPaymentType = () => {
        return paymentTypeSelect.find(item => item.value === props.paymentType).name;
    };

    const getOrderList = () => {
        return props.productList.map((item, i) => {
            return (
                <p key={item._id._id} onClick={onClickHandler(item)} className="cursor-pointer">
                    #{i + 1} - {item._id.name} - {item.quantity} x ${item._id.price}
                </p>
            );
        });
    };

    const orderDetails = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h6 className="text-primary mb-3">Order info</h6>
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
                        <h6 className="text-primary mb-3">Order list</h6>
                        {getOrderList()}
                        <hr />
                        <p>
                            Total order price: <span className="font-weight-bold">$ {getTotalPrice()}</span>
                        </p>
                        <hr />
                        {orderStatus && <Select name="orderStaus" labelText="Order status:" selectList={orderStatusList} selectedValue={orderStatus} onChange={onChangeHandler} />}
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
            return prev + current._id.price * current.quantity;
        }, 0);
        return total.toFixed(2);
    };

    const getCurrentStatus = () => {
        switch (props.status) {
            case 'processing':
                return 'Order in process';
            case 'paid':
                return 'Prepeare for sending';
            case 'sent':
                return 'Sent to user';
            case 'completed':
                return 'Order completed';
            case 'rejected':
                return 'Order rejected';
            default:
                break;
        }
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
            <div id={`collapse${props.index}`} class="collapse" aria-labelledby={`heading${props.index}`} data-parent="#orderAdminAccordion">
                <div className="card-body">{orderDetails()}</div>
            </div>
        </div>
    );
});
