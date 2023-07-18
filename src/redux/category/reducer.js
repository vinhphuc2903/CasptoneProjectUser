import actions from './action'

const initState = {
    listCategory: [],
    listreeCategory: [],
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function CategoryReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.GETING_LIST_CATEGORY:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                userLogin: action.payload,
                loading: false,
                submit: true,
            }
        case actions.GET_LIST_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.GETITNG_LIST_TREE_CATEGORY:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_LIST_TREE_CATEGORY_SUCCESS:
            return {
                ...state,
                userLogin: state.results,
                loading: false,
                submit: true,
            }
        case actions.GET_LIST_TREE_CATEGORY_FAILURE:
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

export default CategoryReducer
