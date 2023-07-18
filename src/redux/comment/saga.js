import { all, call, fork, takeEvery } from 'redux-saga/effects'
import { GetCommentFactory, AddCommentFactory, DeleteCommentFactory } from './factory'
import actions from './action'

export function* getComments() {
    yield takeEvery(actions.GET_COMMENT, function* (payload) {
        const { param, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetCommentFactory.requestgetComments(param))
            if (response?.data?.code === 'ok') {
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

export function* addComment() {
    yield takeEvery(actions.ADD_COMMENT, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => AddCommentFactory.requestaddComments(data))
            if (response?.data?.code === 'ok') {
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

export function* deleteComment() {
    yield takeEvery(actions.DELETE_COMMENT, function* (payload) {
        const { param, onSuccess, onError } = payload
        try {
            const response = yield call(() => DeleteCommentFactory.requestdeleteComments(param))
            if (response?.data?.code === 'ok') {
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

export default function* commentSaga() {
    yield all([
        fork(getComments),
        fork(addComment),
        fork(deleteComment)
    ])
}
