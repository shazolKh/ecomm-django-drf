import {
    request, fail, success,
    details_request, details_fail, details_success,
} from "../constants/productConstants";
import axios from "axios";


export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: request})
        const {data} = await axios.get('/api/products/')

        dispatch({
            type: success,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: fail,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: details_request})
        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type: details_success,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: details_fail,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}