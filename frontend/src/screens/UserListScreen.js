import React, {useEffect, useState} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listUsers, deleteUsers} from "../actions/userActions";


function UserListScreen({history}) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure???')){
            dispatch(deleteUsers(id))
        }
    }

    return (
        <div>
            <h2 style={{textTransform: "uppercase"}}>Customers</h2>
            {loading
                ? (
                    <Loader/>
                ) : error ?
                    (
                        <Message variant={'danger'}>{error}</Message>
                    ) : (
                        <Table
                            striped
                            bordered
                            hover
                            responsive
                            className={'table-sm text-center'}

                        >
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.isAdmin ? (
                                            <i className={'fas fa-check'} style={{color: 'green'}}/>
                                        ) : (
                                            <i className={'fas fa-check'} style={{color: 'red'}}/>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant={"outline-light"} className={'btn-sm'}>
                                                <i className={'fas fa-user-edit'}/>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant={"outline-warning"}
                                            className={'btn-sm'}
                                            style={{marginLeft: 10}}
                                            onClick={() => deleteHandler(user._id)}
                                        >
                                            <i className={'fas fa-trash'}/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}

        </div>
    );
}

export default UserListScreen;