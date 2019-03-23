import React from 'react';

export function OrderConfirmList({cart, totalPrice}) {
    if (!cart.length) {
        return (
            <div className="OrderConfirmList m-2">
                <h5>Your cart is empty now</h5>
            </div>
        );
    }
    return (
        <div className="OrderConfirmList m-2">
            <div className="text-center mb-2">
                <h5>Your order</h5>
            </div>
            {cart.map((item, i) => {
                return (
                    <div className="row my-3" key={item.product._id}>
                        <div className="col-12 col-lg-4 d-flex align-items-center">
                            <img src={item.product.imageUrl} alt="Product" className="w-100" height="auto" />
                        </div>
                        <div className="col-12 col-lg-4 d-flex align-items-center justify-content-end h6">{item.product.name}</div>
                        <div className="col-12 col-lg-4 d-flex align-items-center justify-content-end">
                            {item.quantity} x $ {item.product.price}
                        </div>
                    </div>
                );
            })}
            <hr />
            <div className="d-block w-100 text-right mb-3 h6">Total price: ${totalPrice}</div>
        </div>
    );
}
