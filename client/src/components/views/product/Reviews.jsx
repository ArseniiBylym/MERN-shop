import React, {Fragment, useState, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import StarRaiting from 'react-star-rating-component';
import {Link} from 'react-router-dom';
import {ProductAction} from '../../../actions';
import {Textarea} from '../../form';
import {ReviewItem} from '..';

export const Reviews = observer(({userStore, product}) => {
    const [review, setReview] = useState('');
    const [raiting, setRaiting] = useState(0);

    const sendButton = useRef();

    const reviewsList = () => {
        if (!product.reviews.length) return null;
        return (
            <div className="mb-3">
                {product.reviews.map(item => {
                    return <ReviewItem key={item._id} {...item} />;
                })}
            </div>
        );
    };

    const onChangeHandler = e => {
        const value = e.target.value;
        setReview(value);
    };

    const raitingChangeHandler = nextValue => {
        setRaiting(nextValue);
    };

    const onKeyUpHandler = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            sendButton.current.click();
        }
    };

    const isUserLeftComment = () => {
        if (product && !product.reviews.length) return false;
        const userReview = product.reviews.find(item => {
            return item.author._id === userStore.user._id;
        });
        return !!userReview;
    };

    const sendReview = () => {
        ProductAction.addReview({productId: product._id, review, raiting});
    };

    if (!product) return null;
    return (
        <Fragment>
            {reviewsList()}
            {userStore.user && !isUserLeftComment() ? (
                <>
                    <Textarea value={review} name={review} rows="3" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Add new review" />
                    <div className="raiting-container d-flex align-items-center justify-content-between">
                        <p>Set your product raiting: </p>
                        <div className="raiting-container h4">
                            <StarRaiting name="raiting" value={raiting} starCount={5} onStarClick={raitingChangeHandler} />
                        </div>
                    </div>
                    <button onClick={sendReview} ref={sendButton} className="btn btn-primary" disabled={!review}>
                        Send review
                    </button>
                </>
            ) : userStore.user && isUserLeftComment() ? (
                <p className="text-info">You've already left you're comment</p>
            ) : (
                <p className="text-info">
                    To be able to leave comments you need to{' '}
                    <Link to="/login">
                        <button className="btn btn-outline-info">log in</button>
                    </Link>
                </p>
            )}
        </Fragment>
    );
});
