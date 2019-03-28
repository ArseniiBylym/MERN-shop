/* eslint-disable indent */
import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router';

export const OrderUser = withRouter(props => {
    const onClickHandler = item => e => {
        props.history.push(`/category/${item.product.category}/${item.product.subCategory}/${item.product._id}`);
    };
    const tableRows = () => {
        return props.productList.map((item, i) => (
            <tr key={item.product._id} className="cursor-pointer" onClick={onClickHandler(item)}>
                <th scope="row">{i + 1}</th>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>$ {item.product.price.toFixed(2)}</td>
            </tr>
        ));
    };

    const getTotalPrice = () => {
        const total = props.productList.reduce((prev, current) => {
            return prev + current.product.price * current.quantity;
        }, 0);
        return total.toFixed(2);
    };

    const getCurrentStatus = () => {
        const status = props.orderStatusTypes.find(item => +item.value === +props.status);
        return status ? status.name : '';
    };

    return (
        <div className="OrderUse container p-2">
            <div className="row card w-100 mb-3 mx-0">
                <div className="card-header">
                    Order #{props._id} from <span className="font-weight-bold">{moment(props.updatedAt).format('LLL')}</span>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price for item</th>
                            </tr>
                        </thead>
                        <tbody>{tableRows()}</tbody>
                    </table>
                </div>
                <div className="card-footer row mx-0">
                    <div className="col-6">
                        Total order price: <span className="font-weight-bold">$ {getTotalPrice()}</span>
                    </div>
                    <div className="col-6">
                        Order status: <span className="font-weight-bold">{getCurrentStatus()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});
