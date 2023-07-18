import ApiConstants from 'adapter/ApiConstants';
import ApiOperation from 'adapter/ApiOperation';

const AppFactory = {
    getSettings: () =>
        ApiOperation.request({
            url: ApiConstants.GET_SETTINGS,
            method: 'GET'
        }),
    getDecentralization: () =>
        ApiOperation.request({
            url: ApiConstants.GET_DECENTRALIZATION,
            method: 'GET'
        })
}

export default AppFactory