// Libraries
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

// Components
import {MainHeader, NavBar} from '../../components/navigation';
import {OrderConfirm, Orders} from '../../components/views/order';
import {Home, Category, Product} from '.';

// store
import {ProductStore, UserStore, CartStore, OrderStore} from '../../stores';

// Styles
import './style.scss';

export const MainRouter = props => {
    return (
        <div className="MainRouter container d-flex flex-column">
            <div className="MainRouter__header">
                <MainHeader userStore={UserStore} cartStore={CartStore} />
                <NavBar productStore={ProductStore} userStore={UserStore} />
            </div>
            <div className="MainRouter__content flex-grow-1 bg-cream">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/category/:categoryName/:subCategoryName/:prodId" render={() => <Product userStore={UserStore} productStore={ProductStore} />} />
                    <Route path="/category/:categoryName" render={() => <Category userStore={UserStore} productStore={ProductStore} />} />
                    <Route path="/cart" render={() => <OrderConfirm userStore={UserStore} productStore={ProductStore} cartStore={CartStore} />} />
                    <Route path="/order" render={() => <Orders userStore={UserStore} orderStore={OrderStore} />} />
                    <Redirect from="/*" to="/" />
                </Switch>
            </div>
        </div>
    );
};
