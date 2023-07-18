import { all, call, fork, takeEvery } from 'redux-saga/effects'
import { AddToCart, DeleteProductToCart, UpdateCart } from './factory'
import actions from './action'

export function* addPrdToCart() {
    yield takeEvery(actions.ADD_TO_CART, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => AddToCart.requestAddToCart(data))
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
            } else {
                onError && onError(response?.response?.status)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* deletePrdToCart() {
    yield takeEvery(actions.DELETE_PRODUCT_TO_CART, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => DeleteProductToCart.requestDeleteProductToCart(data))
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
            } else {
                onError && onError(response?.response?.status)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* updateToCart() {
    yield takeEvery(actions.UPDATE_CART, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => UpdateCart.updateToCart(data))
            console.log(response)
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
            } else {
                onError && onError(response?.response?.status)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export default function* getCart() {
    yield all([
        fork(addPrdToCart),
        fork(deletePrdToCart),
        fork(updateToCart)
    ])
}
