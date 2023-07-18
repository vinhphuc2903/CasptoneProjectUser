import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';
import axios from 'axios'

const AddAddressFactory = {
    requestAddAddress: (data) =>
        ApiOperation.request({
            url: ApiConstants.ADD_ADDRESS,
            method: 'POST',
            data: data,
        })
}

const GetProvinceFactory = {
    requestGetProvince: (data) =>
        ApiOperation.request({
            url: ApiConstants.GET_PROVINCE,
            method: 'GET',
        })
}

const GetDistrictFactory = {
    requestGetDistrict: (data) => 
        ApiOperation.request({
            url: ApiConstants.GET_DISTRICT,
            method: 'GET',
            params: data
        })
}

const GetCommunityFactory = {
    requestGetCommunity: (data) => 
        ApiOperation.request({
            url: ApiConstants.GET_COMMUNITY,
            method: 'GET',
            params: data
        })
}

const GetBranchFactory = {
    requestGetBranch: (params) => 
        ApiOperation.request({
            url: ApiConstants.GET_BRANCH,
            method: 'GET',
            params: params
        })
}

const GetPositionFactory = {
    requestGetPosition: (data) => 
        ApiOperation.request({
            url: ApiConstants.GET_POSITION,
            method: 'GET',
        })
}

const GetListAddressFactory = {
    requestGetListAddress: (data) => 
        ApiOperation.request({
            url: ApiConstants.GET_LIST_ADDRESS,
            method: 'GET',
        })
}

const GetMesage = {
    requestGetMessage: (data) => 
        axios({
            url: 'https://ebca-2401-d800-b707-43c1-308a-3e6-5de1-abf8.ap.ngrok.io/',
            method: 'POST',
            params: data
        })
}

export { GetProvinceFactory, GetDistrictFactory, GetCommunityFactory, GetListAddressFactory, GetMesage, AddAddressFactory, GetBranchFactory, GetPositionFactory } 