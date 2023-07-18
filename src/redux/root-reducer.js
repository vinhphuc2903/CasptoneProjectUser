/**
 * import libraries
 */
import { combineReducers } from 'redux';
import loginReducer from './login/reducer';
import CategoryReducer from './category/reducer';
import CartReducer from './cart/reducer';
import AddressReducer from './address/reducer';
import OrderReducer from './order/reducer';
import FilmReducer from './film/reducer';
/**
 * Combinie all reducers on app
 * -----------------------------------------
 * @access : public
 */
const rootReducer = combineReducers({
    Login: loginReducer,
    Category: CategoryReducer,
    Cart: CartReducer,
    Address: AddressReducer,
    Order: OrderReducer,
    Film: FilmReducer,
});

export default rootReducer;
