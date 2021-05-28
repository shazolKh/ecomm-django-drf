import {
    request, fail, success,
    details_request, details_fail, details_success,

    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

export const productListReducers = (state = {products: []}, action) => {
    switch (action.type) {
        case request:
            return {loading: true, products: []}

        case success:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case fail:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const productDetailsReducers = (state = {product: {reviews: []}}, action) => {
    switch (action.type) {
        case details_request:
            return {loading: true, ...state}

        case details_success:
            return {loading: false, product: action.payload}

        case details_fail:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}


export const productDeleteReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true,}

        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}

        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const productCreateReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading: true,}

        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}

        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const productUpdateReducers = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true,}

        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}

        case PRODUCT_UPDATE_FAIL:
            return {loading: false, error: action.payload}

        case PRODUCT_UPDATE_RESET:
            return {product: {}}

        default:
            return state
    }
}


export const productReviewCreateReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true,}

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false, success: true}

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false, error: action.payload}

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}

export const productTopRatedReducers = (state = {products:[]}, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return {loading: true, products: []}

        case PRODUCT_TOP_SUCCESS:
            return {loading: false, products: action.payload}

        case PRODUCT_TOP_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}