import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    productListReducers,
    productDetailsReducers,
    productDeleteReducers,
    productCreateReducers,
    productUpdateReducers,
} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from "./reducers/userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userDelete: userDeleteReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage,
    },
    userLogin: {
        userInfo: userInfoFromLocalStorage,
    }
}
const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;
