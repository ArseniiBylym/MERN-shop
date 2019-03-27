import React, {useEffect} from 'react';
import {FaFacebook, FaInstagram, FaSkype, FaSlack, FaViber} from 'react-icons/fa';
import {SaleContainer} from '../../components/views';
import {ProductStore} from '../../stores';
import {ProductAction} from '../../actions';

export const Home = () => {
    useEffect(() => {
        ProductAction.getSaleProduct();
    }, []);
    return (
        <div className="Home">
            <SaleContainer productStore={ProductStore} />
            <div className="container">
                <footer className="bg-dark p-2 pt-4 text-light w-100 row m-0">
                    <div className="col-12 col-md-6 text-center">
                        <p>Bike Shop, Ukrain Zaporizhzhya Ladozhska st., 17</p>
                        <p>+380971234567 +380991234567</p>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                        <span className="mx-3 h4">
                            <a href="#" className="text-light">
                                <FaFacebook />
                            </a>
                        </span>
                        <span className="mx-3 h4">
                            <a href="#" className="text-light">
                                <FaInstagram />
                            </a>
                        </span>
                        <span className="mx-3 h4">
                            <a href="#" className="text-light">
                                <FaSkype />
                            </a>
                        </span>
                        <span className="mx-3 h4">
                            <a href="#" className="text-light">
                                <FaSlack />
                            </a>
                        </span>
                        <span className="mx-3 h4">
                            <a href="#" className="text-light">
                                <FaViber />
                            </a>
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
};
