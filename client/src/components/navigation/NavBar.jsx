import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
// components
import {Modal} from '../modal/index';
import {ProductAction} from '../../actions';

export const NavBar = withRouter(
    observer(({productStore, userStore}) => {
        useEffect(() => {
            ProductAction.getCategories();
        }, []);

        if (!productStore.categories.length) return <div style={{height: 65}}> </div>;

        return (
            <div className="NavBar container-fluid d-flex flex-row align-items-center justify-content-start">
                {productStore.categories.length &&
                    productStore.categories.map(item => {
                        return (
                            <NavLink key={item.categoryName} className="upperCase py-1 px-3" to={`/category/${item.categoryName}`}>
                                <h5>{item.categoryName}</h5>
                            </NavLink>
                        );
                    })}
                {userStore.user && userStore.user.isAdmin && (
                    <div className="ml-auto">
                        <Modal.ProductType />
                    </div>
                )}
            </div>
        );
    }),
);
