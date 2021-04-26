import {
    request, fail, success,
    details_request, details_fail, details_success,
} from "../constants/productConstants";

export const productListReducers = (state = { products: []}, action) => {
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

export const productDetailsReducers = (state = { product: { reviews:[] } }, action) => {
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