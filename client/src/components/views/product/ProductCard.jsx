import React from 'react';
import {NavLink} from 'react-router-dom';

import DefaultProductImage from '../../../resources/img/default-product.jpg';

export const ProductCard = props => {
    const {_id, price, salePrice, name, imageUrl, category, subCategory} = props;
    return (
        <div key={_id} className="ProductCard card row flex-row text-primary-black my-2">
            {salePrice && <div className="saleLabel saleLabel__topLeft">SALE</div>}
            <div className="ProductCard__image col-12 col-md-12 col-lg-3 p-2 d-flex align-items-center">
                <NavLink to={`/category/${category}/${subCategory}/${_id}`}>
                    <img src={imageUrl || DefaultProductImage} alt="Product" className="w-100" height="auto" />
                </NavLink>
            </div>
            <div className="ProductCard__details col-12 col-md-6 col-lg-4 p-2 py-3">
                <NavLink to={`/category/${category}/${subCategory}/${_id}`}>
                    <h4>{name}</h4>
                </NavLink>
            </div>
            <div className="ProductCard__info col-12 col-md-6 col-lg-5 p-3 p-2 py-3 text-center">
                <h5 className="price mb-2 rounded p-2 px-4 ">
                    <span className={salePrice ? 'text-crossed' : ''}>$ {price.toFixed(2)}</span>
                    {salePrice && <span className="text-danger ml-1">$ {salePrice.toFixed(2)}</span>}
                </h5>
                <div className="byeButton btn btn-primary cursor-pointer w-100">Bye now</div>
            </div>
        </div>
    );
};
