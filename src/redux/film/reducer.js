import actions from './action'

const initState = {
    film: [],
    detailFilm: {},
    detailShow: {},
    showtimeByBranch: {},
    loading: false,
    status: null,
    error: null,
    submit: null,
}

function FilmReducer(state = initState, action) {
    const { type, error } = action
    switch (type) {
        case actions.GETTING_ALL_FILM:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_ALL_FILM_FAILSE:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_ALL_FILM_SUCCESS:
            return {
                ...state,
                loading: false,
                film: action?.payload?.listFilmInfos ?? [],
                status: error?.status,
                submit: false,
            }
        case actions.GETTING_DETAIL_FILM:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_DETAIL_FILM_FAILSE:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_DETAIL_FILM_SUCCESS:
            return {
                ...state,
                loading: false,
                detailFilm: action.payload,
                status: error?.status,
                submit: false,
            }
        case actions.GETTING_DETAIL_SHOWTIME:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_DETAIL_SHOWTIME_FAILSE:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_DETAIL_SHOWTIME_SUCCESS:
            return {
                ...state,
                loading: false,
                detailShow: action.payload,
                status: error?.status,
                submit: false,
            }
        case actions.GETTING_SHOWTIME_BY_BRANCH:
            return {
                ...state,
                loading: true,
                submit: null,
            }
        case actions.GET_SHOWTIME_BY_BRANCH_FAILSE:
            return {
                ...state,
                loading: false,
                submit: true,
            }
        case actions.GET_SHOWTIME_BY_BRANCH_SUCCESS:
            return {
                ...state,
                loading: false,
                showtimeByBranch: action.payload,
                status: error?.status,
                submit: false,
            }
        default:
            return {
                ...state,
            }
    }
}

export default FilmReducer;
