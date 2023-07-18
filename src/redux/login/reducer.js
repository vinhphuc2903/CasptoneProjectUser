import actions from './action'

const initState = {
    userLogin: [],
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function LoginReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.SUBMITING_LOGIN:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.SUBMIT_LOGIN_SUCCESS:
            return {
                ...state,
                // userLogin: action?.payload?.data?.result,
                loading: false,
                submit: true,
            }
        case actions.SUBMIT_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.SUBMITING_REGISTER:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.SUBMIT_REGISTER_SUCCESS:
            return {
                ...state,
                // userLogin: state.results,
                loading: false,
                submit: true,
            }
        case actions.SUBMIT_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.GET_USER_DETAIL:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                userLogin: action?.payload,
                loading: false,
                submit: true,
            }
        case actions.GET_USER_DETAIL_FAILUSE:
            return {
                ...state,
                loading: false,
                status: error?.status,
                submit: false,
            }
        case actions.CHANGE_PROFILE:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.CHANGE_PROFILE_SUCCESS:
            return {
                ...state,
                // userLogin: state.results,
                loading: false,
                submit: true,
            }
        case actions.CHANGE_PROFILE_FAILUSE:
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

export default LoginReducer
