import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";
import SearchBox from "./SearchBox";

export default function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant={"dark"} expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to={'/'} style={{textTransform:"uppercase"}}>
                        <Navbar.Brand>Cypher Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox/>
                        <Nav className="ml-auto" style={{textTransform:"uppercase"}}>
                            <LinkContainer to={"/cart"}>
                                <Nav.Link><i className="fas fa-shopping-cart"/> Cart</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown id={'username'} title={userInfo.name} style={{textTransform:"uppercase"}}>
                                    <LinkContainer to={'/profile'}>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to={"/login"}>
                                    <Nav.Link><i className="fas fa-user"/> Login</Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown id={'adminmenu'} title={"Admin"} style={{textTransform:"uppercase"}}>
                                    <LinkContainer to={'/admin/user-list'}>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to={'/admin/product-list'}>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to={'/admin/order-list'}>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
