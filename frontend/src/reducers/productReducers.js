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
} from "../constants/productConstants";

export const productListReducers = (state = {products: []}, action) => {
    switch (action.type) {
        case request:
            return {loading: true, products: []}

        case success:
            return {loading: false, products: action.payload}

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
            return {loading: false, success: true, product:action.payload}

        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}