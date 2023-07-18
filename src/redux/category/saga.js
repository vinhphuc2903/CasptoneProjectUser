import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetCategory, GetTreeCategory} from './factory'
import actions from './action'
import CategoryAction from './action';

export function* getListCategory() {
    yield takeEvery(actions.GET_LIST_CATEGORY, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetCategory.requestGetCategory(data))
            if (response?.status === 200) {
                yield put({
                    type: CategoryAction.GET_LIST_CATEGORY_SUCCESS,
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

export function* getListTreeCategory() {
    yield takeEvery(actions.GET_LIST_TREE_CATEGORY, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetTreeCategory.requestGetTreeCategory(data))
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

export default function* getCategory() {
    yield all([
        fork(getListCategory), 
        fork(getListTreeCategory)
    ])
}
