import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import { GetCommunityFactory, GetDistrictFactory, AddAddressFactory, GetProvinceFactory, GetListAddressFactory, GetMesage, GetBranchFactory, GetPositionFactory } from './factory'

export function* addAddress() {
    yield takeEvery(actions.ADD_ADDRESS, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => AddAddressFactory.requestAddAddress(data));
            if (response?.data?.code === 'ok') {
                onSuccess && onSuccess(response);
            } else {
                onError && onError("")
            }
        } catch (error) {
            yield put({
                type: actions.GET_SETTINGS_FAILURE,
                payload: error,
            });
        }
    });
}

export function* getProvice() {
    yield takeEvery(actions.GET_PROVINCE, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetProvinceFactory.requestGetProvince());
            if (response?.status === 200) {
                yield put({
                    type: actions.GET_PROVINCE_SUCCESS,
                    payload: response?.data,
                });
                onSuccess && onSuccess(response);
            } else {
                onError && onError("")
            }
        } catch (error) {
            yield put({
                type: actions.GET_PROVINCE_FAILURE,
                payload: error,
            });
        }
    });
}

export function* getMessage() {
    yield takeEvery(actions.GET_MESSAGE, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() =>  GetMesage.requestGetMessage(data));
            if (response?.status === 200) {
                onSuccess && onSuccess(response?.data);
            } else {
                console('not okkkk')
                onError && onError("")
            }
        } catch (error) {
            onError && onError("")
            // yield put({
            //     type: actions.GET_SETTINGS_FAILURE,
            //     payload: error,
            // });
        }
    });
}

export function* getDistrict() {
    yield takeEvery(actions.GET_DISTRICT, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetDistrictFactory.requestGetDistrict(data));
            if (response?.status === 200) {
                yield put({
                    type: actions.GET_DISTRICT_SUCCESS,
                    payload: response?.data,
                });
                onSuccess && onSuccess(response);
            } else {
                onError && onError("")
            }
        } catch (error) {
            yield put({
                type: actions.GET_DISTRICT_FAILURE,
                payload: error,
            });
        }
    });
}

export function* getBranch() {
    yield takeEvery(actions.GET_BRANCH, function* (payload) {
        const { params, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetBranchFactory.requestGetBranch(params));
            if (response?.status === 200) {
                onSuccess && onSuccess(response?.data);
            } else {
                onError && onError("")
            }
        } catch (error) {
            yield put({
                type: actions.GET_DISTRICT_FAILURE,
                payload: error,
            });
        }
    });
}

export function* getPosition() {
    yield takeEvery(actions.GET_POSITION, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetPositionFactory.requestGetPosition());
            if (response?.status === 200) {
                onSuccess && onSuccess(response?.data);
            } else {
                onError && onError("")
            }
        } catch (error) {
            yield put({
                type: actions.GET_DISTRICT_FAILURE,
                payload: error,
            });
        }
    });
}

export function* getCommunity() {
    yield takeEvery(actions.GET_COMMUNITY, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetCommunityFactory.requestGetCommunity(data));
            if (response?.status === 200) {
                yield put({
                    type: actions.GET_COMMUNITY_SUCCESS,
                    payload: response?.data,
                });
                onSuccess && onSuccess(response);
            } else {
                onError && onError("")
            }
        } catch (error) {
            yield put({
                type: actions.GET_COMMUNITY_FAILUSE,
                payload: error,
            });
        }
    });
}

export function* getAddressByUser() {
    yield takeEvery(actions.GET_LIST_ADDRESS_BY_USER, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetListAddressFactory.requestGetListAddress(data));
            if (response?.data?.code === 'ok') {
                onSuccess && onSuccess(response);
            } else {
                onError && onError("")
            }
        } catch (error) {
            yield put({
                type: actions.GET_SETTINGS_FAILURE,
                payload: error,
            });
        }
    });
}

export default function* getAddress() {
    yield all([
        fork(addAddress),
        fork(getCommunity),
        fork(getDistrict),
        fork(getProvice),
        fork(getAddressByUser),
        fork(getMessage),
        fork(getPosition),
        fork(getBranch)
    ]);
}
