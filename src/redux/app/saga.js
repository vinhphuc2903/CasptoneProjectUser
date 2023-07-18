import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory';

export function* getSettings() {
    yield takeEvery(actions.GET_SETTINGS, function* () {
        try {
            const response = yield call(() => factories.getSettings());
            yield put({
                type: actions.GET_SETTINGS_SUCCESS,
                payload: response
            });
        } catch (error) {
            yield put({
                type: actions.GET_SETTINGS_FAILURE,
                payload: error,
            });
        }
    });
}

export function* getDecentralization() {
    yield takeEvery(actions.GET_DECENTRALIZATION, function* () {
        try {
            const response = yield call(() => factories.getDecentralization());
            yield put({
                type: actions.GET_DECENTRALIZATION_SUCCESS,
                payload: response
            });
        } catch (error) {
            yield put({
                type: actions.GET_DECENTRALIZATION_FAILURE,
                payload: error,
            });
        }
    });
}

export default function* employeesSaga() {
    yield all([
        fork(getSettings),
        fork(getDecentralization),
    ]);
}
