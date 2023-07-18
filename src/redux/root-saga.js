/**
 * imprt libraries
 */
import { all } from 'redux-saga/effects'

/**
 * impoprt saga of other components
 */
import loginSaga from './login/saga';
import getCategory from './category/saga';
import getCart from './cart/saga';
import getAddress from './address/saga';
import getOrder from './order/saga';
import commentSaga from './comment/saga';
import filmSaga from './film/saga';

export default function* rootSaga () {
    yield all([
        loginSaga(),
        getCategory(),
        getCart(),
        getAddress(),
        getOrder(),
        commentSaga(),
        filmSaga()
    ])
}
