import actions from './action'

const initState = {
    provinces: [],
    districts: [],
    communes: [],
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function AddressReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.GETING_COMMUNITY:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_COMMUNITY_FAILUSE:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_COMMUNITY_SUCCESS:
            return {
                ...state,
                loading: false,
                communes: action.payload,
                status: error?.status,
                submit: false,
            }
        case actions.GETING_DISTRICT:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_DISTRICT_FAILURE:
            return {
                ...state,
                userLogin: state.results,
                loading: false,
                submit: true,
            }
        case actions.GET_DISTRICT_SUCCESS:
            return {
                ...state,
                loading: false,
                districts: action.payload,
                status: error?.status,
                submit: false,
            }
        case actions.GETING_PROVINCE:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_PROVINCE_SUCCESS:
            return {
                ...state,
                userLogin: state.results,
                loading: false,
                provinces: action.payload,
                submit: true,
            }
        case actions.GET_PROVINCE_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.GETING_LIST_ADDRESS_BY_USER:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_LIST_ADDRESS_BY_USER_SUCCESS:
            return {
                ...state,
                userLogin: state.results,
                loading: false,
                submit: true,
            }
        case actions.GET_LIST_ADDRESS_BY_USER_FAILUSE:
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

export default AddressReducer;
