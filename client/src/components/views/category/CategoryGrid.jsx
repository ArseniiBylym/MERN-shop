import React from 'react';
import {NavLink} from 'react-router-dom';
import './styles.scss';

export const CategoryGrid = ({category, productStore}) => {
    const categories = () => {
        const list = productStore.getSubCategories(category);
        if (!list) return null;
        return list.map(item => {
            return (
                <NavLink to={`/category/${category}/${item.name}`} key={item.name} className="col-12 col-md-6 col-lg-6">
                    <div className="card w-100 py-3">
                        <img src={item.image} alt={item.name} className="w-100 h-auto my-2" />
                        <h5 className="text-center upperCase py-2 my-2">{item.name}</h5>
                    </div>
                </NavLink>
            );
        });
    };
    return (
        <div className="CategoryGrid">
            <h3 className="text-center upperCase">{category}</h3>
            <div className="containter row">{categories()}</div>
        </div>
    );
};
