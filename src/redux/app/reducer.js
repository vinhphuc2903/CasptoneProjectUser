import actions from './action'
import EventRegister from "utils/EventRegister"
import { RELOAD_PERMISSION } from "utils/EventRegister"

const getSetting = () => {
    try {
        return localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : {}
    } catch (error) {
        localStorage.setItem('settings', {})
    }
    return {}
}
const getPermission = () => {
    try {
        return localStorage.getItem('decentralization') ? JSON.parse(localStorage.getItem('decentralization')) : {}
    } catch (error) {
        localStorage.setItem('decentralization', {})
    }
    return {}
}

const initState = {
    settings: getSetting(),
    decentralization: getPermission(),
}

function AppReducer (state = initState, action) {
    switch (action.type) {
        case actions.GET_SETTINGS_SUCCESS:
            localStorage.setItem('settings', JSON.stringify(action.payload))
            return {
                ...state,
                settings: action.payload
            }
        case actions.GET_SETTINGS_FAILURE:
            localStorage.setItem('settings', JSON.stringify({}))
            return {
                ...state,
                setting: {}
            }
        case actions.GET_DECENTRALIZATION_SUCCESS:
            const decentralization = action.payload;
            const oldDecentralization = localStorage.getItem('decentralization')
            if (!oldDecentralization || decentralization.Version != getPermission().Version) {
                localStorage.setItem('decentralization', JSON.stringify(decentralization))
                // window.location.reload()
                EventRegister.emit(RELOAD_PERMISSION, {})
            }
            return {
                ...state,
                decentralization: action.payload
            }
        case actions.GET_DECENTRALIZATION_FAILURE:
            localStorage.setItem('decentralization', JSON.stringify({}))
            return {
                ...state,
                decentralization: {}
            }
        default:
            return {
                ...state,
            }
    }
}

export default AppReducer
