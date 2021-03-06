import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register} from "../actions/userActions";

export default function RegisterScreen({location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    // const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h2>Sign Up</h2>
            {message && <Message variant={'danger'}>{message}</Message>}
            {error && <Message variant={'danger'}>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'name'}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'Enter Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required="required"
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId={'email'}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type={'email'}
                        placeholder={'Enter Email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required="required"
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId={'password'}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required="required"
                        type={'password'}
                        placeholder={'Enter Password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId={'passwordConfirmed'}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required="required"
                        type={'password'}
                        placeholder={'Confirm Password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type={"submit"} variant={"primary"}>
                    Register
                </Button>
            </Form>
            <Row className={'py-3'}>
                <Col>
                    Have an Account?
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    >
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}