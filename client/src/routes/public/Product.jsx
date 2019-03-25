import React, {Fragment, useEffect} from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react-lite';
import {ProductAction} from '../../actions';
import {Modal} from '../../components/modal';
import {Reviews} from '../../components/views';
import {UserStore} from '../../stores/index';

export const Product = withRouter(
    observer(props => {
        const product = props.productStore.selectedProduct;
        // console.log(product.averageRaiting);

        useEffect(() => {
            ProductAction.getProductDetails(props.match.params.prodId);
            return () => {
                ProductAction.clearProductDetails();
            };
        }, [props.match.params.prodId]);

        if (!props.productStore.selectedProduct) return null;
        return (
            <Fragment>
                <div className="Product row m-3">
                    <div className="Product__header d-flex flex-wrap align-items-center justify-content-between w-100 mx-3">
                        <h3 className="mb-0">{product.name}</h3>
                        {UserStore.isAdmin && <Modal.ProductEdit {...product} />}
                    </div>
                    <div className="Product__header row m-3">
                        <div className="image col-12 col-md-9 position-relative p-0">
                            {product.salePrice && <div className="saleLabel saleLabel__topLeft">SALE</div>}
                            <Modal.ImageDetails imageUrl={product.imageUrl} />
                        </div>
                        <div className="byeSection col-12 col-md-3 p-2 py-3 text-center">
                            <h5 className="price mb-2 rounded p-2 px-4 ">
                                <span className={product.salePrice ? 'text-crossed' : ''}>$ {product.price.toFixed(2)}</span>
                                {product.salePrice && <span className="text-danger ml-1">$ {product.salePrice.toFixed(2)}</span>}
                            </h5>
                            <Modal.AddToCart product={product} text="Bye now" />
                            {/* <div className="byeButton btn btn-primary cursor-pointer w-100">Bye now</div> */}
                        </div>
                    </div>
                    <div className="Product__details row m-3">
                        <nav className="col-12 py-2">
                            <div className="nav nav-tabs" role="tablist">
                                <a
                                    className="nav-item nav-link active"
                                    id="Prod-description-tab"
                                    data-toggle="tab"
                                    href="#nav-description"
                                    role="tab"
                                    aria-controls="nav-description"
                                    aria-selected="true"
                                >
                                    Description
                                </a>
                                <a className="nav-item nav-link" id="Prod-details-tab" data-toggle="tab" href="#nav-details" role="tab" aria-controls="nav-details" aria-selected="false">
                                    Details
                                </a>
                                <a className="nav-item nav-link" id="Prod-reviews-tab" data-toggle="tab" href="#nav-reviews" role="tab" aria-controls="nav-reviews" aria-selected="false">
                                    Reviews ({product.reviews.length})
                                </a>
                                <a className="nav-item nav-link" id="Prod-delivery-tab" data-toggle="tab" href="#nav-delivery" role="tab" aria-controls="nav-delivery" aria-selected="false">
                                    Delivery
                                </a>
                            </div>
                        </nav>
                        <div className="tab-content col-12 py-2" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-description" role="tabpanel" aria-labelledby="Prod-description-tab">
                                {product.description}
                            </div>
                            <div className="tab-pane fade" id="nav-details" role="tabpanel" aria-labelledby="Prod-details-tab">
                                ...
                            </div>
                            <div className="tab-pane fade" id="nav-reviews" role="tabpanel" aria-labelledby="Prod-reviews-tab">
                                <Reviews userStore={props.userStore} product={product} />
                            </div>
                            <div className="tab-pane fade" id="nav-delivery" role="tabpanel" aria-labelledby="Prod-delivery-tab">
                                Some static info about delivery types
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }),
);
