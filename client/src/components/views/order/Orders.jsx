import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {OrderAction} from '../../../actions';
import {OrderUser, OrderAdmin} from '.';

export const Orders = observer(({userStore, orderStore}) => {
    useEffect(() => {
        OrderAction.getOrder();
    }, [userStore.user]);

    const getUserOrders = () => {
        return orderStore.orders.map(item => <OrderUser key={item._id} {...item} />);
    };

    const getAdminOrders = () => {
        return (
            <div className="accordion" id="orderAdminAccordion">
                {orderStore.orders.map((item, i) => (
                    <OrderAdmin key={item._id} {...item} index={i}/>
                ))}
            </div>
        );
    };

    const orderList = () => {
        return userStore.isAdmin ? getAdminOrders() : getUserOrders();
    };

    if (!userStore.user) return <div className="text-center h4 mt-3">To see your orders you need to login</div>;
    return <>{orderStore.orders.length ? <div className="Orders">{orderList()}</div> : <div className="text-center h4 mt-3">You have no orders now</div>}</>;
});
