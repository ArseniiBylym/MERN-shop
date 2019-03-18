import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
// components
import {Modal} from '../modal/index';
import {ProductAction} from '../../actions';

export const NavBar = withRouter(
    observer(({store}) => {
        useEffect(() => {
            console.log('mounted', store.categories);
            ProductAction.getCategories();
        }, []);
        useEffect(() => {
            console.log('updated', store.categories);
        });

        if (!store.categories.length) return <div style={{height: 65}}> </div>;

        return (
            <div className="NavBar container-fluid d-flex flex-row align-items-center justify-content-start">
                {store.categories.length &&
                    store.categories.map(item => {
                        return (
                            <NavLink key={item.categoryName} className="text-primary_black upperCase p-3 pl-0" to={`/category/${item.categoryName}`}>
                                <h5>{item.categoryName}</h5>
                            </NavLink>
                        );
                    })}
                <div className="ml-auto">
                    <Modal.ProductType />
                </div>
            </div>
        );
    }),
);
