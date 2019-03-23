import React from 'react';

export const Orders = ({userStore, orderStore}) => {
    return <>{orderStore.orders.length ? <div className="Orders">Orders</div> : <div className="text-center h4 mt-3">You have no orders now</div>}</>;
};
