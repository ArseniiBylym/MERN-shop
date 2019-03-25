import React from 'react';
import {observer} from 'mobx-react-lite';
import './style.scss';
import {Link} from 'react-router-dom';
import {IoIosLogIn} from 'react-icons/io';
import {SearchInput} from '../form';
import {Modal} from '../modal';
import {ProductStore} from '../../stores';
import {ProductAction} from '../../actions';

export const MainHeader = observer(({userStore, cartStore}) => {
    const searchActionHandler = string => {
        ProductAction.searchProduct(string);
    };

    return (
        <div className="MainHeader container-fluid">
            <div className="row d-flex flex-row align-items-center justify-content-between">
                <div className="MainHeader__left text-white bg-primary col-12 col-sm-6 col-md-3 ">
                    <Link to="/" className="text-white no-underline">
                        <h3 className="mb-0">BIKE</h3>
                        <h3 className="ml-5 mb-0">SHOP</h3>
                    </Link>
                </div>
                <div className="MainHeader__center col-12 col-sm-6 col-md-5 mt-2">
                    <SearchInput
                        placeholder="Searching by product name"
                        foundList={ProductStore.foundList}
                        isVisible={ProductStore.foundListVisible}
                        searchAction={searchActionHandler}
                        outsideClickHandler={ProductAction.clearSearchProduct}
                    />
                </div>
                <div className="MainHeader__right d-flex flex-row align-items-center justify-content-end col-12 col-md-4 ml-auto">
                    {userStore.user && (
                        <div className="dropdown">
                            <button
                                className="btn btn-white dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {userStore.user.email}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Link className="dropdown-item" to="/cart">
                                    Cart
                                </Link>
                                <Link className="dropdown-item" to="/order">
                                    Orders
                                </Link>
                            </div>
                        </div>
                    )}
                    <Modal.Cart cartStore={cartStore} />
                    {userStore.user ? (
                        <Modal.Logout />
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
