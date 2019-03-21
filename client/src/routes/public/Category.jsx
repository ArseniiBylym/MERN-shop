import React from 'react';
import {observer} from 'mobx-react-lite';
import {Route, Switch, NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Modal} from '../../components/modal';
import {ProductList, CategoryGrid} from '../../components/views';

export const Category = withRouter(
    observer(props => {
        const categoryName = props.match.params.categoryName;
        const {userStore, productStore} = props;

        const subCategoriesList = () => {
            const list = productStore.getSubCategories(categoryName);
            if (!productStore.categories || !list) return null;

            return list.map((item, i) => {
                return (
                    <NavLink key={item.name} to={`/category/${categoryName}/${item.name}`}>
                        <li className="list-group-item upperCase">{item.name}</li>
                    </NavLink>
                );
            });
        };

        const adminAddCategoryButton = () => {
            return userStore.isAdmin ? (
                <div className="text-center w-100">
                    <Modal.ProductSubType groupName={categoryName} />
                </div>
            ) : null;
        };

        if (!productStore || !userStore) return null;
        return (
            <div className="Category container-fluid row">
                <div className="Category__sidebar col-4">
                    <ul className="list-group my-3">{subCategoriesList()}</ul>
                    {adminAddCategoryButton()}
                </div>
                <div className="Category__content col-8 my-3">
                    <Switch>
                        <Route exact path={`/category/${categoryName}`} render={() => <CategoryGrid category={categoryName} productStore={productStore} />} />
                        {/* <Route path={`/category/${categoryName}/:subCategoryName`} render={() => <ProductList productStore={productStore} />} /> */}
                        <Route path={`/category/:categoryName/:subCategoryName`} render={() => <ProductList isAdmin={userStore.isAdmin} productStore={productStore} />} />
                    </Switch>
                </div>
            </div>
        );
    }),
);
