import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const GetListOrderByStatus = {
    requestGetListOrderByStatus : (data) =>
        ApiOperation.request({
            url: ApiConstants.GET_ORDER_BY_STATUS,
            method: 'GET',
            params: data,
        })
}

const GetListOrderByUserId = {
    requestGetListOrderByUserId : (data) =>
        ApiOperation.request({
            url: ApiConstants.GET_LIST_ORDER_BY_USERID,
            method: 'GET'
        })
}

const GetDetailOrderById = {
    requestGetDetailOrderById : (param) =>
        ApiOperation.fetchSingle(
            ApiConstants.GET_LIST_ORDER_BY_USERID,
            param
        ),
}

const AddOrder = {
    requestAddOrder: (data, param ) => 
        ApiOperation.request({
            url: ApiConstants.ADD_ORDER,
            method: 'POST',
            data: data,
        })
}

const GetOrderById = {
    requestGetOrder: (data) => 
        ApiOperation.request({
            url: ApiConstants.GET_ORDER_BY_ID,
            method: 'POST',
            params: data,
        })
}

const ChangeStatusOrder = {
    requestChangeStatusOrder: (params, data) => 
        ApiOperation.request({
            url: ApiConstants.CHANGE_STATUS_ORDER,
            method: 'PUT',
            params: params,
            data: data,
        })
}

const GetListFood = {
    requestGetListFood: () => 
        ApiOperation.request({
            url: ApiConstants.GET_FOOD,
            method: 'GET'
        })
}

const GetShowtime = {
    requestGetShowtime: (params) => 
        ApiOperation.request({
            url: ApiConstants.GET_SHOWTIME,
            method: 'GET',
            params: params
        })
}

const GetLinkPayment = {
    requestGetLinkPayment: (params) => 
        ApiOperation.request({
            url: ApiConstants.GET_LINK_PAYMENT,
            method: 'GET',
            params: params
        })
}

const UpdatePaymentOrder = {
    requestUpdateStatusOrder: (data) => 
        ApiOperation.request({
            url: ApiConstants.UPDATE_CART,
            method: 'PUT',
            data: data
        })
}

export { GetListOrderByUserId, AddOrder, GetOrderById, GetDetailOrderById, GetListOrderByStatus, ChangeStatusOrder, GetListFood, GetShowtime, GetLinkPayment, UpdatePaymentOrder } 

