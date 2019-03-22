// Libraries
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

// Components
import {MainHeader, NavBar} from '../../components/navigation';
import {Home, Category, Product} from '.';

// store
import {ProductStore, UserStore, CartStore} from '../../stores';

// Styles
import './style.scss';

export const MainRouter = props => {
    // const productStore = useContext(ProductStore);
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
                    <Redirect from="/*" to="/" />
                </Switch>
            </div>
        </div>
    );
};
