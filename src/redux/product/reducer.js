import actions from './action'

const initState = {
    listProduct: [],
    listProductByCategory: [],
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function ProductReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.GETTING_LIST_PRODUCT:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                userLogin: action.payload,
                loading: false,
                submit: true,
            }
        case actions.GET_LIST_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.GETTITNG_LIST_PRODUCT_BY_CATEGORY:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_LIST_PRODUCT_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                userLogin: state.results,
                loading: false,
                submit: true,
            }
        case actions.GET_LIST_PRODUCT_BY_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.ADD_PRODUCT:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.ADD_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.DELETE_PRODUCT:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.GET_PRODUCT_BY_ID:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_PRODUCT_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.GET_BEST_SELLER:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        default:
            return {
                ...state,
            }
    }
}

export default ProductReducer
