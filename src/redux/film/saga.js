import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetFilmFactory, GetDetailFilmFactory, GetDetailShowTimeFactory, GetShowtimeByBranchFactory } from './factory'
import actions from './action'

export function* getAllFilm() {
    yield takeEvery(actions.GET_ALL_FILM, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetFilmFactory.requestGetAllFilm(params))
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
                yield put({
                    type: actions.GET_ALL_FILM_SUCCESS,
                    payload: response?.data,
                });
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

export function* getDetailFilm() {
    yield takeEvery(actions.GET_DETAIL_FILM, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetDetailFilmFactory.requestGetDetailFilm(params))
            if (typeof response?.filmInfos != 'undefined') {
                yield put({
                    type: actions.GET_DETAIL_FILM_SUCCESS,
                    payload: response,
                });                
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

export function* getDetailShowTime() {
    yield takeEvery(actions.GET_DETAIL_SHOWTIME, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetDetailShowTimeFactory.requestGetDetailShowTime(params))
            if (typeof response?.showtimeData != 'undefined') {
                yield put({
                    type: actions.GET_DETAIL_SHOWTIME_SUCCESS,
                    payload: response,
                });                
                onSuccess && onSuccess(response);
            } else {
                onError && onError(response?.status)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* getShowtimeByBranchFactory() {
    yield takeEvery(actions.GET_SHOWTIME_BY_BRANCH, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetShowtimeByBranchFactory.requestGetShowtimeByBranchFactory(params))
            if (response?.status == 200) {
                yield put({
                    type: actions.GET_SHOWTIME_BY_BRANCH_SUCCESS,
                    payload: response?.data,
                });                
                onSuccess && onSuccess(response?.data);
            } else {
                onError && onError(response?.status)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}
export default function* filmSaga() {
    yield all([
        fork(getAllFilm),
        fork(getDetailFilm),
        fork(getDetailShowTime),
        fork(getShowtimeByBranchFactory)
    ])
}
