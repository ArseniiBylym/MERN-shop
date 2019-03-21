import React, {Fragment} from 'react';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import './style.scss';

export const ImageDetails = ({imageUrl}) => {
    return (
        <Fragment>
            <img src={imageUrl} alt="Product" className="w-100 cursor-pointer" height="auto" data-toggle="modal" data-target=".image-modal-lg" />
            <div className="modal fade image-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg full-size-picture">
                    <div className="modal-content position-relative">
                        <i className="icon-close-round" data-dismiss="modal">
                            <IoIosCloseCircleOutline />
                        </i>
                        <img src={imageUrl} alt="Product" className="w-100" height="auto" />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
