import actions from './action'

const initState = {
    listOrder: [],
    paging: [],
    listFood: [],
    showTime: {},
    detailShowtime: {},
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function OrderReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.GETTING_LIST_ORDER_BY_USERID:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_LIST_ORDER_BY_USERID_SUCCESS:
            return {
                ...state,
                listOrder: action.payload?.data?.listOrderDetails,
                paging: action.payload?.data?.paging,
                loading: false,
                submit: true,
            }
        case actions.GET_LIST_ORDER_BY_USERID_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.ADDING_ORDER:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.ADD_ORDER_SUCCESS:
            return {
                ...state,
                userLogin: state.results,
                loading: false,
                submit: true,
            }
        case actions.ADD_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.GET_ORDER_BY_ID:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.GET_FOOD_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.GET_FOOD_SUCCESS:
            return {
                ...state,
                loading: false,
                listFood: action.payload?.data,
                status: error?.status,
                submit: false,
            }
        case actions.GET_SHOWTIME_SUCCESS:
            return {
                ...state,
                loading: false,
                showtime: action.payload,
                status: error?.status,
                submit: false,
            }
        case actions.GET_DETAIL_BY_ID_SUCCESS:
            console.log(action?.payload)
            return {
                ...state,
                detailShowtime: action?.payload,
                loading: false,
                status: error?.status,
                submit: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default OrderReducer
