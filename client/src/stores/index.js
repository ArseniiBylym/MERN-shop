// All stores import
import {Product} from './Product.store';
import {User} from './User.store';

// Create context for React useContext hook
// export const ProductStore = createContext(new Product());
export const ProductStore = new Product();
export const UserStore = new User();
