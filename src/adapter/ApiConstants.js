const BASE_PREFIX = '/api/1'
const AUTH_PREFIX = ''
const USER = '/users'
const CATEGORY = '/Category'
const PRODUCT = '/Product'
const ORDER = '/order'
const ADDRESS = '/Address'
const COMMENT = '/Comment'
const ISADMIN = '/Permission'
const FILM = '/films'
const SHOWTIME = '/showtime'

const ApiConstants = {
    // AUTH
    LOGIN: `${BASE_PREFIX}${AUTH_PREFIX}/login`,
    REGISTER: `${BASE_PREFIX}${AUTH_PREFIX}/login/create-user`,
    LOGOUT: `${BASE_PREFIX}${AUTH_PREFIX}/login/logout`,
    GET_USER: `${BASE_PREFIX}${AUTH_PREFIX}/users`,
    CHANGE_PROFILE: `${BASE_PREFIX}${AUTH_PREFIX}/login/update-user`,
    CHANGE_PASS: `${BASE_PREFIX}${AUTH_PREFIX}/login/update-pass`,

    //PERMISSION
    ISADMIN: `${BASE_PREFIX}${ISADMIN}/is-admin`,

    // CATEGORY
    CATEGORY: `${BASE_PREFIX}${CATEGORY}/get-list-category`,
    TREE_CATEGORY: `${BASE_PREFIX}${CATEGORY}/get-list-tree-category`,
    // PRODUCT
    LIST_PRODUCT: `${BASE_PREFIX}${PRODUCT}/find-product`,
    LIST_PRODUCT_BY_CATEGORY: `${BASE_PREFIX}${PRODUCT}/get-list-product-by-id-category`,
    ADD_PRODUCT: `${BASE_PREFIX}${PRODUCT}/add-product`,
    DELETE_PRODUCT: `${BASE_PREFIX}${PRODUCT}/delete-product-by-id`,
    GET_PRODUCT_BY_ID: `${BASE_PREFIX}${PRODUCT}/get-product-by-id`,
    GET_BEST_SELLER: `${BASE_PREFIX}${PRODUCT}/get-best-seller`,
    // ORDER
    GET_ORDER_BY_STATUS: `${BASE_PREFIX}${ORDER}/get-order-by-status`,
    GET_LIST_ORDER_BY_USERID: `${BASE_PREFIX}${ORDER}`,
    GET_DETAIL_ORDER_BY_ID: `${BASE_PREFIX}${ORDER}/get-order-by-id`,
    GET_ORDER_BY_ID: `${BASE_PREFIX}${ORDER}/get-cart`,
    ADD_ORDER: `${BASE_PREFIX}${ORDER}`,
    CHANGE_STATUS_ORDER: `${BASE_PREFIX}${ORDER}/change-status`,
    GET_LINK_PAYMENT: `${BASE_PREFIX}${ORDER}/get-link-payment`,
    UPDATE_PAYMENT: `${BASE_PREFIX}${ORDER}/get-link-payment`,

    // CART
    ADD_TO_CART: `${BASE_PREFIX}${ORDER}`,
    DELETE_PRODUCT_TO_CART: `${BASE_PREFIX}${ORDER}/del-from-cart`,
    UPDATE_CART: `${BASE_PREFIX}${ORDER}/payment-order`,

    // ADDRESS
    ADD_ADDRESS: `${BASE_PREFIX}${USER}/add-address`,
    GET_PROVINCE: `${BASE_PREFIX}${USER}/province`,
    GET_DISTRICT: `${BASE_PREFIX}${USER}/district`,
    GET_COMMUNITY: `${BASE_PREFIX}${USER}/commune`,
    GET_LIST_ADDRESS: `${BASE_PREFIX}${USER}/get-list-address-by-user`,
    GET_BRANCH: `${BASE_PREFIX}${USER}/branch`,

    // FILM
    GET_ALL_FILM: `${BASE_PREFIX}${FILM}`,
    GET_DETAIL_FILM: `${BASE_PREFIX}${FILM}`,
    GET_DETAIL_SHOWTIME: `${BASE_PREFIX}${FILM}/show-time-detail`,
    GET_SHOWTIME_BY_BRANCH: `${BASE_PREFIX}${FILM}/show-time-by-branch`,
    //COMMENT
    GET_COMMENT: `${BASE_PREFIX}${COMMENT}/get-comment-by-product`,
    ADD_COMMENT: `${BASE_PREFIX}${COMMENT}/add-comment`,
    // EDIT_COMMENT: `${BASE_PREFIX}${COMMENT}/Edit Commnet`,
    DELETE_COMMENT: `${BASE_PREFIX}${COMMENT}/delete-comment`,
    // ORDER
    GET_FOOD: `${BASE_PREFIX}${ORDER}/get-food`,
    CREATE_ORDER: `${BASE_PREFIX}${ORDER}`,
    //SHOWTIME
    GET_SHOWTIME: `${BASE_PREFIX}${SHOWTIME}/all-showtime`
    // GET_BRANCHES: ''
}

export default ApiConstants
export { BASE_PREFIX, AUTH_PREFIX, CATEGORY, PRODUCT, ORDER, ADDRESS, COMMENT }
