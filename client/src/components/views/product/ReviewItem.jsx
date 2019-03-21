import React from 'react';
import StarRaiting from 'react-star-rating-component';
import {FaUserCircle} from 'react-icons/fa';
import moment from 'moment';

export const ReviewItem = ({author, date, raiting, text}) => {
    return (
        <div className="border rounded p-2 m-1">
            <div className="d-flex flex-wrap align-items-center">
                <div className="user">
                    <FaUserCircle /> {author.name}
                </div>
                <div className="ml-2">{moment(date).format('LLL')}</div>
                <div className="h5 mb-0 ml-auto">
                    <StarRaiting name="raiting" editing={false} starCount={5} value={raiting} />
                </div>
            </div>
            <div className="p-2 bg-white">{text}</div>
        </div>
    );
};
