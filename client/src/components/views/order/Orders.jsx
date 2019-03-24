import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {OrderAction} from '../../../actions';
import {OrderUser, OrderAdmin} from '.';

export const Orders = observer(({userStore, orderStore}) => {
    useEffect(() => {
        OrderAction.getOrder();
    }, [userStore.user]);

    const orderList = () => {
        return orderStore.orders.map(item => {
            return userStore.isAdmin ? <OrderAdmin key={item._id} {...item} /> : <OrderUser key={item._id} {...item} />;
        });
    };

    if (!userStore.user) return <div className="text-center h4 mt-3">To see your orders you need to login</div>;
    return <>{orderStore.orders.length ? <div className="Orders">{orderList()}</div> : <div className="text-center h4 mt-3">You have no orders now</div>}</>;
});
