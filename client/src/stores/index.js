import {createContext} from 'react';
// All stores import
import {Product} from './Product.store';
import {User} from './User.store';
import {Cart} from './Cart.store';
import {Order} from './Order.store';
import {Types} from './Types.store';
import {Notification} from './Notification.store';

export const ProductStore = new Product();
export const UserStore = new User();
export const CartStore = new Cart();
export const OrderStore = new Order();
export const TypesStore = new Types();
export const NotificationStore = createContext(new Notification());
