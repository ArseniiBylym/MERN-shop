import React from 'react';
import {observer} from 'mobx-react-lite';
import './style.scss';
import {Link} from 'react-router-dom';
import {FaCartPlus} from 'react-icons/fa';
import {observable} from 'mobx';
import {SearchInput} from '../form';
import {UserAction} from '../../actions';

export const MainHeader = observer(({store}) => {
    console.log(store);
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
                    <button className="btn mx-2">
                        <p className="text-primary text-center h4 mb-0">
                            <FaCartPlus />
                        </p>
                    </button>
                    {store.user ? (
                        <button onClick={UserAction.logoutUser} className="loginButton btn btn-secondary">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="loginButton btn btn-secondary">Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
});
