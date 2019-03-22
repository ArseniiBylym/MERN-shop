import React from 'react';
import {observer} from 'mobx-react-lite';
import './style.scss';
import {Link} from 'react-router-dom';
import {IoIosLogIn, IoIosLogOut} from 'react-icons/io';
import {SearchInput} from '../form';
import {UserAction} from '../../actions';
import {Modal} from '../modal';

export const MainHeader = observer(({userStore, cartStore}) => {
    return (
        <div className="MainHeader container-fluid">
            <div className="row d-flex flex-row align-items-center justify-content-between">
                <div className="MainHeader__left text-white bg-primary p-2 ">
                    <h3 className="mb-0">BIKE</h3>
                    <h3 className="ml-5 mb-0">SHOP</h3>
                </div>
                <div className="MainHeader__center flex-grow-1 mx-4">
                    <SearchInput>
                        {(inputValue, onChange, keyUpHandler, clickHandler) => (
                            <div className="input-group ">
                                <input
                                    value={inputValue}
                                    onChange={onChange}
                                    onKeyUp={keyUpHandler}
                                    type="text"
                                    className="form-control"
                                    placeholder="Searching by products"
                                    aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                    <button onClick={clickHandler} className="btn btn-primary pointer" id="basic-addon2">
                                        Search
                                    </button>
                                </div>
                            </div>
                        )}
                    </SearchInput>
                </div>
                <div className="MainHeader__right d-flex flex-row align-items-center ml-auto">
                    <select className="form-control">
                        <option> +38 097 555 55 55</option>
                        <option> +38 066 333 33 33</option>
                    </select>
                    <Modal.Cart cartStore={cartStore} />
                    {userStore.user ? (
                        <button onClick={UserAction.logoutUser} className="loginButton btn mb-0">
                            <span className="h3">
                                <IoIosLogOut />
                            </span>
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="loginButton btn mb-0">
                                <span className="h3">
                                    <IoIosLogIn />
                                </span>
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
});
