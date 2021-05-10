import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {getUserDetails, updateUserProfile, updateUsers} from "../actions/userActions";
import {USER_UPDATE_RESET} from "../constants/userConstants";

export default function UserEditScreen({match, history}) {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET
            })
            history.push('/admin/user-list')
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
            }
        }
    }, [userId, user, successUpdate, history])

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUsers({_id:user._id, name, email, isAdmin}))
    }
    return (
        <div>
            <Link to={'/admin/user-list'}>
                Go Back
            </Link>
            <FormContainer>
                <h2 style={{textTransform: 'uppercase'}}>Edit User</h2>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}

                {loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId={'name'}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Name'}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId={'isAdmin'}>
                                <Form.Check
                                    type={'checkbox'}
                                    label={'Is Admin'}
                                    checked={isAdmin}
                                    onChange={(e) => setAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type={"submit"} variant={"primary"}>
                                Update
                            </Button>
                        </Form>
                    )}
            </FormContainer>
        </div>
    )
}