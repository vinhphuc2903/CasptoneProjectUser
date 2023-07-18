import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { LoginFactory, RegisterFactory, GetUserFactory, ChangeProfileFactory, ChangePasswordFactory, GetIsAdminFactory } from './factory'
import actions from './action'
import LoginAction from './action';
import Cookies from 'js-cookie';
import moment from 'moment';

export function* signIn() {
    yield takeEvery(actions.SUBMIT_LOGIN, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => LoginFactory.requestSignIn(data))
            if (response?.data?.code === 200) {
                Cookies.set('username', response?.data?.data?.Name);
                Cookies.set('token', response?.data?.data?.Token);
                Cookies.set('isLogin',true);
                yield put({
                    type: LoginAction.SUBMIT_LOGIN_SUCCESS,
                    payload: response,
                })
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* registerLogin() {
    yield takeEvery(actions.SUBMIT_REGISTER, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => RegisterFactory.requestRegister(data))
            if (response?.data?.code === 200) {
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.msgNo)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* getUser() {
    yield takeEvery(actions.GET_USER_DETAIL, function* (payload) {
        const { onSuccess, onError } = payload
        try {
            const response = yield call(() => GetUserFactory.requestGetUser())
            if (response?.status === 200) {
                yield put({
                    type: LoginAction.GET_USER_DETAIL_SUCCESS,
                    payload: response?.data,
                })
                onSuccess && onSuccess(response?.data);
            } else {
                onError && onError()
                Cookies.remove('isLogin', false)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* changeProfile() {
    yield takeEvery(actions.CHANGE_PROFILE, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            // const formData = new FormData();

            // if( data?.avatarUrl?.file  != null && typeof data?.avatarUrl?.file !== 'undefined' )
            // {
            //     formData.append('avatarUrl', data?.avatarUrl?.file)
            // }
            // else {
            //     data.avatarUrl = null
            // }
            // formData.append('birthDay', moment(data?.birthDay).format('YYYY/MM/DD'))
            // formData.append('email', data?.email)
            // formData.append('firstName', data?.firstName)
            // formData.append('gender', data?.gender)
            // formData.append('lastName', data?.lastName)
            // formData.append('phone', data?.phone)
            // formData.append('username', data?.username)

            const response = yield call(() => ChangeProfileFactory.requestChangeProfile(data))
            if (response?.data?.code === 200) {
                const cookies = Object.keys(
                    Cookies.get()); // Get an array of all cookie names
                    cookies.forEach(cookie => {
                    Cookies.remove(cookie); // Remove each cookie one by one
                });
                console.log(response?.data?.data)
                Cookies.set('username', response?.data?.data?.Username);
                Cookies.set('token', response?.data?.data?.Token);
                Cookies.set('isLogin',true);
                // yield put({
                //     type: LoginAction.SUBMIT_LOGIN_SUCCESS,
                //     payload: response,
                // })
                // yield call(async () => {
                //     await onSuccess(response?.data?.data?.Token);
                // });
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* changePass() {
    yield takeEvery(actions.CHANGE_PASSWORD, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {            
            const response = yield call(() => ChangePasswordFactory.requestChangePassword(data))
            if (response?.data?.code === 200) {
                onSuccess && onSuccess();
                const cookies = Object.keys(
                    Cookies.get()); // Get an array of all cookie names
                    cookies.forEach(cookie => {
                    Cookies.remove(cookie); // Remove each cookie one by one
                });
            } else {
                onError && onError(response?.data?.msgNo)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* getIsAdmin() {
    yield takeEvery(actions.ISADMIN, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {            
            const response = yield call(() => GetIsAdminFactory.requestGetIsAdmin())
            if (response?.data?.code === 'ok') {
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export default function* loginSaga() {
    yield all([
        fork(signIn), 
        fork(registerLogin),
        fork(getUser),
        fork(changeProfile),
        fork(changePass),
        fork(getIsAdmin)
    ])
}
