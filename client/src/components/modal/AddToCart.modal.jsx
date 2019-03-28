import React, {useState, useRef, useContext} from 'react';
import {CartAction} from '../../actions';
import {NotificationStore} from '../../stores';
import {Input} from '../form';

export const AddToCart = ({product, text}) => {
    const [quantity, setQuantity] = useState('1');
    const notificationStore = useContext(NotificationStore);

    const modalBody = useRef(null);
    const closeButton = useRef(null);

    const clearState = () => {
        setQuantity('1');
    };

    const backdropClickHandler = e => {
        if (modalBody.current.contains(e.target)) return;
        closeModal();
    };

    const addToCartHandler = async () => {
        await CartAction.addToCart(product, quantity);
        notificationStore.addNotification('Product added to the cart!', 'success');
        closeModal();
    };

    const closeModal = () => {
        clearState();
        closeButton.current.click();
    };

    const onChangeHandler = e => {
        const value = +e.target.value;
        if (value < 1 || value > product.quantity) return false;
        setQuantity(value);
    };

    const productConfirm = () => {
        return (
            <div className="row">
                <div className="col-12 col-lg-4 d-flex align-items-center">
                    <img src={product.imageUrl} alt="Product" className="w-100" height="auto" />
                </div>
                <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center h6">{product.name}</div>
                <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                    <Input type="number" value={quantity} onChange={onChangeHandler} name="quantity" labelText="Quantity:" labelPosition="left" />
                </div>
            </div>
        );
    };

    const totalPrice = () => {
        const actualPrice = product.salePrice ? product.salePrice : product.price;
        return (+actualPrice * +quantity).toFixed(2);
    };

    if (!product || !quantity) return null;
    return (
        <>
            <div className="buyButton btn btn-primary cursor-pointer w-100" data-toggle="modal" data-target={`#AddToCartModal-${product._id}`}>
                {text}
            </div>
            <div
                className="modal fade "
                onClick={backdropClickHandler}
                id={`AddToCartModal-${product._id}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="productTypeLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content" ref={modalBody}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="productTypeLabel">
                                Add to the cart
                            </h5>
                        </div>
                        <div className="modal-body container bg-cream">{productConfirm()}</div>
                        <div className="modal-footer flex-wrap">
                            <div className="d-block w-100 text-right mb-3 h6">Total price: ${totalPrice()}</div>
                            <button type="button" ref={closeButton} onClick={closeModal} className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" onClick={addToCartHandler} className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
