import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const LoginFactory = {
    requestSignIn: (data) =>
        ApiOperation.request({
            url: ApiConstants.LOGIN,
            method: 'POST',
            data: data
        })
}

const RegisterFactory = {
    requestRegister: (data) => 
        ApiOperation.request({
            url: ApiConstants.REGISTER,
            method: 'POST',
            data: data
        })
}

const GetUserFactory = {
    requestGetUser: () => 
        ApiOperation.request({
            url: ApiConstants.GET_USER,
            method: 'GET',
        })
}

const ChangeProfileFactory = {
    requestChangeProfile: (data) => 
        ApiOperation.request({
            url: ApiConstants.CHANGE_PROFILE,
            method: 'PUT',
            data: data,
        })
}

const ChangePasswordFactory = {
    requestChangePassword: (data) => 
        ApiOperation.request({
            url: ApiConstants.CHANGE_PASS,
            method: 'PUT',
            data: data,
        })
}

const GetIsAdminFactory = {
    requestGetIsAdmin: (data) => 
        ApiOperation.request({
            url: ApiConstants.ISADMIN,
            method: 'GET',
        })
}

export { LoginFactory, RegisterFactory, GetUserFactory, ChangeProfileFactory, ChangePasswordFactory, GetIsAdminFactory } 