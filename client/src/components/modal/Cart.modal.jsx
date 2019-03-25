import React, {useRef, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {FaCartPlus} from 'react-icons/fa';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router';
import {CartAction} from '../../actions';

export const Cart = withRouter(
    observer(({cartStore, ...props}) => {
        useEffect(() => {
            CartAction.initCart();
        }, []);

        const onRemoveHandler = productId => e => {
            if (cartStore.totalLength === 1) closeModal();
            CartAction.removeFromCart(productId);
        };

        const toOrderHandler = () => {
            console.log(props);
            props.history.push('/cart');
        };

        const modalBody = useRef(null);
        const closeButton = useRef(null);

        const backdropClickHandler = e => {
            if (modalBody.current.contains(e.target)) return;
            closeModal();
        };

        const orderList = () => {
            if (!cartStore.totalLength) return null;
            return cartStore.cart.map(item => {
                return (
                    <div className="row" key={item.product._id}>
                        <div className="col-12 col-lg-3 d-flex align-items-center">
                            <img src={item.product.imageUrl} alt="Product" className="w-100" height="auto" />
                        </div>
                        <div className="col-12 col-lg-3 d-flex align-items-center justify-content-center h6">{item.product.name}</div>
                        <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center">{item.quantity} </div>
                        <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center">$ {item.product.price} </div>
                        <div className="col-12 col-lg-2 text-danger d-flex align-items-center justify-content-center">
                            <i className="d-block h5 cursor-pointer" onClick={onRemoveHandler(item.product._id)}>
                                <IoIosCloseCircleOutline />
                            </i>
                        </div>
                    </div>
                );
            });
        };

        const closeModal = () => {
            closeButton.current.click();
        };

        return (
            <>
                <button className="btn mx-2 cursor-pointer" data-toggle={cartStore.totalLength ? 'modal' : ''} data-target="#CartModal">
                    <p className="text-primary text-center h4 mb-0">
                        <FaCartPlus />
                    </p>
                </button>
                {cartStore.totalLength && <span className="badge-counter badge badge-secondary rounded-circle">{cartStore.totalLength}</span>}
                <div className="modal fade text-primary_black" onClick={backdropClickHandler} id="CartModal" tabIndex="-1" role="dialog" aria-labelledby="productTypeLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg text-black" role="document">
                        <div className="modal-content" ref={modalBody}>
                            <div className="modal-header">
                                <h5 className="modal-title " id="productTypeLabel">
                                    Cart
                                </h5>
                            </div>
                            <div className="modal-body container bg-cream">
                                <div className="row">
                                    <div className="col-3 d-none d-lg-block text-center" />
                                    <div className="col-3 d-none d-lg-block text-center">Name</div>
                                    <div className="col-2 d-none d-lg-block text-center">Quantity</div>
                                    <div className="col-2 d-none d-lg-block text-center">Price</div>
                                    <div className="col-2 d-none d-lg-block text-center">Remove</div>
                                </div>
                                <hr />
                                {orderList()}
                            </div>
                            <div className="modal-footer flex-wrap">
                                <div className="d-block w-100 text-right mb-3 h6">Total price: ${cartStore.totalPrice}</div>
                                <button type="button" ref={closeButton} onClick={closeModal} className="btn btn-secondary" data-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" onClick={toOrderHandler} className="btn btn-primary" data-dismiss="modal">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }),
);
