// import TokenService from 'adapter/auth/token'
import Cookies from 'js-cookie'
import AppConfig from '../utils/AppConfig'

const onRequest = (config) => {
    // config.headers.Authorization = `Bearer ${Cookies.get('token').replace('"','')}`.replace('"','')
    // config.headers.XApiKey = `S4R13E7?J5bjp7{!CZMADnGwhC8FGZZ2p5MBH0qk`
    return config
}

const onRequestError = (error) => {
    Promise.reject(error)
}

const onResponse = (response) => response

const onResponseError = async (error) => {
    if (error.response) {
        // Access Token expired
        if (
            error.response.status === 401
        ) {
            try {
                // window.location.href="/login"
                Cookies.remove('user');
            } catch (_error) {
                return Promise.reject(_error)
            }
        }
    }
    return Promise.reject(error)
}

export const setupInterceptersTo = (axiosInstance) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError)
    return axiosInstance
}