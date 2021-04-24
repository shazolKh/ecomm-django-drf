import {request, fail, success} from "../constants/productConstants";
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