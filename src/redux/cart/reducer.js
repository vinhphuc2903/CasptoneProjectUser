import actions from './action'

const initState = {
    listOrder: [],
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function CartReducer(state = initState, action) {
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
                listOrder: action.payload,
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
        case actions.ADDING_TO_CART:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                userLogin: state.results,
                loading: false,
                submit: true,
            }
        case actions.ADD_TO_CART_FAILURE:
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
        case actions.DELETE_PRODUCT_TO_CART:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.DELETE_PRODUCT_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.DELETE_PRODUCT_TO_CART_FAILURE:
            return {
                ...state,
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

export default CartReducer
