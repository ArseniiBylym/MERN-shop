// Libraries
import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// Components
import {MainHeader, NavBar} from '../../components/navigation';
import {Home, Category} from '.';

// store
import {ProductStore, UserStore} from '../../stores';

// Styles
import './style.scss';

export const MainRouter = props => {
    // const productStore = useContext(ProductStore);
    return (
        <div className="MainRouter container d-flex flex-column">
            <div className="MainRouter__header">
                <MainHeader store={UserStore} />
                <NavBar store={ProductStore} />
            </div>
            <div className="MainRouter__content flex-grow-1 bg-cream">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/category/:categoryName" component={Category} />
                    <Redirect from="/*" to="/" />
                </Switch>
            </div>
        </div>
    );
};
