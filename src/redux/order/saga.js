import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetListFood, GetListOrderByUserId, AddOrder, GetListOrderByStatus, GetLinkPayment, GetOrderById, GetDetailOrderById, ChangeStatusOrder, GetShowtime, UpdatePaymentOrder} from './factory'
import actions from './action'
import OrderAction from './action';

export function* getListFood() {
    yield takeEvery(actions.GET_FOOD, function* (payload) {
        const { onSuccess, onError } = payload
        try {
            const response = yield call(() => GetListFood.requestGetListFood())
            if (response?.status === 200) {
                yield put({
                    type: OrderAction.GET_FOOD_SUCCESS,
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

export function* getListOrderByStatus() {
    yield takeEvery(actions.GET_LIST_ORDER_BY_STATUS, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetListOrderByStatus.requestGetListOrderByStatus(data))
            if (response?.status === 200) {
                yield put({
                    type: OrderAction.GET_LIST_ORDER_BY_USERID_SUCCESS,
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

export function* changeStatusOrderById() {
    yield takeEvery(actions.CHANGE_STATUS_ORDER, function* (payload) {
        const { data, params, onSuccess, onError } = payload
        try {
            const response = yield call(() => ChangeStatusOrder.requestChangeStatusOrder(params,data))
            if (response?.data?.code === 'ok') {
                onSuccess && onSuccess("Duyệt đơn hàng thành công ");
            } else {
                onError && onError("Duyệt đơn hàng thất bại")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* getListOrderByUserId() {
    yield takeEvery(actions.GET_LIST_ORDER_BY_USERID, function* (payload) {
        const { onSuccess, onError } = payload
        try {
            const response = yield call(() => GetListOrderByUserId.requestGetListOrderByUserId())
            if (response?.status === 200) {
                yield put({
                    type: OrderAction.GET_LIST_ORDER_BY_USERID_SUCCESS,
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

export function* getDetailOrderById() {
    yield takeEvery(actions.GET_DETAIL_BY_ID, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetDetailOrderById.requestGetDetailOrderById(params))
            if (response != null && typeof response != 'undefined') {
                yield put({
                    type: OrderAction.GET_DETAIL_BY_ID_SUCCESS,
                    payload: response,
                })
                onSuccess && onSuccess(response);
            } else {
                console.log(response)
                onError && onError("onEnrror")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* getListOrderById() {
    yield takeEvery(actions.GET_ORDER_BY_ID, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetOrderById.requestGetOrder())
            // console.log(response?.data?.code)
            if (response?.data?.code === 'ok') {

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

export function* addOrder() {
    yield takeEvery(actions.ADD_ORDER, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => AddOrder.requestAddOrder(data))
            if (response?.data?.code === 200) {
                onSuccess && onSuccess(response);
            } else {
                console.log(response)
                onError && onError(response?.data?.msgNo)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* getShowTime() {
    yield takeEvery(actions.GET_SHOWTIME, function* (payload) {
        const { onSuccess, onError, params } = payload
        try {
            const response = yield call(() => GetShowtime.requestGetShowtime(params))
            if (response?.status === 200) {
                if(response?.data?.showTimeDatas.length != 0)
                {
                    yield put({
                        type: OrderAction.GET_SHOWTIME_SUCCESS,
                        payload: response?.data?.showTimeDatas[0],
                    })
                }
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

export function* getLinkPayment() {
    yield takeEvery(actions.GET_LINK_PAYMENT, function* (payload) {
        const { onSuccess, onError, params } = payload
        try {
            const response = yield call(() => GetLinkPayment.requestGetLinkPayment(params))
            if (response?.data?.code === 200) {
                onSuccess && onSuccess(response?.data?.data?.linkpayment);
            } else {
                console.log('response', response)
                onError && onError(response?.data?.msgNo)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}
export function* updatePaymentOrder() {
    yield takeEvery(actions.UPDATE_STATUS_PAYMENT, function* (payload) {
        const { onSuccess, onError, data } = payload
        try {
            const response = yield call(() => UpdatePaymentOrder.requestUpdateStatusOrder(data))
            console.log('response', response)
            if (response?.data?.code === 200) {
                onSuccess && onSuccess("ok");
            } else {
                console.log('response', response)
                onError && onError(response?.data?.msgNo)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}
export default function* getOrder() {
    yield all([
        fork(getListOrderByUserId), 
        fork(getListOrderById),
        fork(addOrder),
        fork(getDetailOrderById),
        fork(getListOrderByStatus),
        fork(changeStatusOrderById),
        fork(getListFood),
        fork(getShowTime),
        fork(getLinkPayment),
        fork(updatePaymentOrder)
    ])
}
