import {request, fail, success} from "../constants/productConstants";

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