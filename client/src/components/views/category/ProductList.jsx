import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react-lite';
import {toJS} from 'mobx';
import {ProductAction} from '../../../actions/index';
import {ProductListHeader, ProductCard} from '..';
import {UserStore} from '../../../stores/index';

export const ProductList = withRouter(
    observer(props => {
        const category = props.match.params.categoryName;
        const subCategory = props.match.params.subCategoryName;

        const [state, setState] = useState({
            sortOrder: 'name',
            sortDirrection: true,
            gridView: 'grid',
        });

        const sortOrderOptions = [{name: 'Name', value: 'name'}, {name: 'Price', value: 'price'}];

        useEffect(() => {
            ProductAction.getProductList({category, subCategory});
        }, [category, subCategory]);

        const onChangeHandler = e => {
            const name = e.target.name || e.target.getAttribute('name');
            const value = e.target.value || e.target.getAttribute('value');
            setState({
                ...state,
                [name]: value,
            });
        };

        const sortDirrectionHandler = () => {
            setState({
                ...state,
                sortDirrection: !state.sortDirrection,
            });
        };

        const sortedList = () => {
            return toJS(props.productStore.productList)
                .slice()
                .sort((a, b) => {
                    if (a[state.sortOrder] > b[state.sortOrder]) return state.sortDirrection ? 1 : -1;
                    if (a[state.sortOrder] < b[state.sortOrder]) return state.sortDirrection ? -1 : 1;
                    return 0;
                });
        };

        const products = () => {
            if (props.productStore.productListLength === 0) return null;
            return sortedList().map(item => {
                return <ProductCard key={item._id} {...item} category={category} subCategory={subCategory} />;
            });
        };

        return (
            <div className="ProductList">
                <ProductListHeader
                    sortOrder={state.sortOrder}
                    sortDirrection={state.sortDirrection}
                    sortDirrectionHandler={sortDirrectionHandler}
                    sortOptions={sortOrderOptions}
                    gridView={state.gridView}
                    onChangeHandler={onChangeHandler}
                    category={category}
                    subCategory={subCategory}
                    isAdmin={UserStore.isAdmin}
                />
                {products()}
            </div>
        );
    }),
);
