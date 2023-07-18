import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetProduct, GetProductByCategory, AddProduct, DeleteProduct, GetProductById, GetBestSeller } from './factory'
import actions from './action'
import ProductAction from './action';

export function* getListProduct() {
    yield takeEvery(actions.GET_LIST_PRODUCT, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetProduct.requestGetProduct(data))
            if (response?.status === 200) {
                yield put({
                    type: ProductAction.GET_LIST_PRODUCT_SUCCESS,
                    payload: response,
                })
                onSuccess && onSuccess(response);
            } else {
                onError && onError("onEnrror")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* GetProductByIdPrd() {
    yield takeEvery(actions.GET_PRODUCT_BY_ID, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetProductById.requestGetProductById(data))
            if (response?.data?.code === 'ok') {
                yield put({
                    type: ProductAction.GET_PRODUCT_BY_ID_SUCCESS,
                    payload: response,
                })
                onSuccess && onSuccess(response);
            } else {
                onError && onError("onEnrror")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* getListProductByCategory() {
    yield takeEvery(actions.GET_LIST_PRODUCT_BY_CATEGORY, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            data.PageSize = 200
            const response = yield call(() => GetProductByCategory.requestGetProductByCategory(data))
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

export function* addProduct() {
    yield takeEvery(actions.ADD_PRODUCT, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const formData = new FormData();
            formData.append('Color', data?.Color);
            formData.append('IdCategory', data?.IdCategory);
            formData.append('ImportQuantity', data?.ImportQuantity);
            formData.append('Name', data?.Name);
            formData.append('Keyword', data?.Name);
            formData.append('Price', data?.Price);
            formData.append('Weight', data?.Weight);
            formData.append('Name', data?.Name);
            data?.imageUrl?.map(item => { return formData.append('ProductImages', item?.file) })
            formData.append('AvtImage', data?.uploadImage[0]?.file);  
            formData.append('Discount', '0');
            formData.append('Description', data?.Description);
            formData.append('Detail', data?.Detail);
            const response = yield call(() => AddProduct.requestAddProduct(formData))
            console.log(response)
            if (response?.data?.code === "ok") {
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

export function* deleteProduct() {
    yield takeEvery(actions.DELETE_PRODUCT, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => DeleteProduct.requestDeleteProduct(data))
            if (response?.data?.code === "ok") {
                yield put({
                    type: ProductAction.DELETE_PRODUCT_SUCCESS,
                    payload: response,
                })
                onSuccess && onSuccess(response);
            } else {
                onError && onError("onEnrror")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* getBestSaleProduct() {
    yield takeEvery(actions.GET_BEST_SELLER, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetBestSeller.requestGetBestSeller())
            console.log(response)
            if (response?.data?.code === "ok") {
                onSuccess && onSuccess(response);
            } else {
                onError && onError("onEnrror")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}


export default function* getProduct() {
    yield all([
        fork(getListProduct), 
        fork(getListProductByCategory),
        fork(addProduct),
        fork(deleteProduct),
        fork(GetProductByIdPrd),
        fork(getBestSaleProduct)
    ])
}
