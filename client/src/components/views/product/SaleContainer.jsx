import React, {useContext, useState, useEffect, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import './style.scss';
import { Link } from 'react-router-dom';

export const SaleContainer = observer(({productStore}) => {
    const carousel = useRef(null);
    if (!productStore.saleProduct.length) return null;
    return (
        <>
            <h4 className="text-center my-4">
                Don't miss the <span className="text-danger">BIG SALE!</span>
            </h4>
            <div ref={carousel} id="saleContainerCarousel" className="SaleContainer carousel slide" data-pause="hover" data-ride="carousel" data-interval={4000}>
                <ol className="carousel-indicators ">
                    {productStore.saleProduct.map((item, i) => {
                        return <li key={item._id} data-target="#saleContainerCarousel" data-slide-to={i} className={`bg-dark ${i === 0 ? 'active' : ''}`} />;
                    })}
                </ol>
                <div className="carousel-inner">
                    {productStore.saleProduct.map((item, i) => {
                        return (
                            <Link to={`/category/${item.category}/${item.subCategory}/${item._id}`} key={item._id} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                                <img className="d-block w-100" src={item.imageUrl} alt={item.name} />
                                <div className="details text-center">
                                    <h5>{item.name}</h5>
                                    <h5 className="text-danger">
                                        Sale price: <span className="text-crossed text-dark">${item.price}</span> ${item.salePrice}
                                    </h5>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <a className="carousel-control-prev " href="#saleContainerCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon bg-dark m-2 rounded-circle" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next " href="#saleContainerCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon bg-dark m-2 rounded-circle" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    );
});
