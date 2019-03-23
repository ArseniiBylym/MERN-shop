import React from 'react';
import {IoIosLogOut} from 'react-icons/io';
import {UserAction} from '../../actions';

export const Logout = props => {
    return (
        <>
            <button className="loginButton btn mb-0" data-toggle="modal" data-target="#LogoutModal">
                <span className="h3">
                    <IoIosLogOut />
                </span>
            </button>
            <div className="modal fade" id="LogoutModal" tabIndex="-1" role="dialog" aria-labelledby="productTypeLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">Are you sure you want to logout?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" onClick={UserAction.logoutUser} className="btn btn-primary" data-dismiss="modal">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
