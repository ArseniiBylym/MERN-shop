// All stores import
import {Product} from './Product.store';
import {User} from './User.store';
import {Cart} from './Cart.store';

export const ProductStore = new Product();
export const UserStore = new User();
export const CartStore = new Cart();
