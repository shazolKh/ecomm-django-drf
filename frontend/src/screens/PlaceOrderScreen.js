import React, {useEffect, useState} from 'react';
import {Row, Col, ListGroup, Image, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";


function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
        </div>
    );
}

export default PlaceOrderScreen;