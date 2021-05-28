import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Row, Col, Image, ListGroup, Button, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import {listProductDetails, createProductReview} from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants";


export default function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({
                type: PRODUCT_CREATE_REVIEW_RESET
            })
        }

        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quantity=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
                rating, comment
            }
        ))
    }

    return (
        <div>
            <Link to={'/'} className={'btn btn-light my-3'}>Go Back</Link>
            {
                loading ?
                    <Loader/>
                    : error ?
                    <Message variant={'danger'}>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid/>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant={"flush"}>
                                        <ListGroup.Item>
                                            <h4 style={{textTransform: "uppercase"}}>{product.name}</h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`}
                                                    color={'#f8e825'}/>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant={"flush"}>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status</Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Quantity</Col>
                                                    <Col className={"my-1"}>
                                                        <Form.Control
                                                            as={"select"}
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }

                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className={'btn-block'}
                                                type={"button"}
                                                disabled={product.countInStock === 0}
                                            >
                                                Add to cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md={6}>
                                    <h4 style={{textTransform: "uppercase", color: "white"}}>Reviews</h4>
                                    {product.reviews.length === 0 && <Message variant={'info'}>No Reviews</Message>}

                                    <ListGroup variant={'flush'}>
                                        <ListGroup.Item>
                                            <h5 style={{textTransform: "uppercase"}}>Write a Review</h5>

                                            {loadingProductReview && <Loader/>}
                                            {loadingProductReview &&
                                            <Message variant={'success'} style={{textTransform: "uppercase"}}>Review Submitted</Message>}

                                            {errorProductReview &&
                                            <Message variant={'warning'} style={{textTransform: "uppercase"}}>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId={'rating'}>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as={'select'}
                                                            value={rating}
                                                            onChange={(e) =>
                                                                setRating(e.target.value)}
                                                        >
                                                            <option value={''}>Select...</option>
                                                            <option value={'1'}>1 - Poor</option>
                                                            <option value={'2'}>2 - Fair</option>
                                                            <option value={'3'}>3 - Good</option>
                                                            <option value={'4'}>4 - Very Good</option>
                                                            <option value={'5'}>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId={'comment'}>
                                                        <Form.Control
                                                            as={'textarea'}
                                                            row={7}
                                                            value={comment}
                                                            placeholder={'Write Comment'}
                                                            onChange={(e) =>
                                                                setComment(e.target.value)}
                                                        />
                                                        <Button
                                                            disabled={loadingProductReview}
                                                            type={'submit'}
                                                            variant={'primary'}
                                                            style={{
                                                                float: 'right',
                                                                marginTop: '15px'
                                                            }}
                                                        >
                                                            Submit
                                                        </Button>

                                                    </Form.Group>
                                                </Form>
                                            ) : (
                                                <Message variant={'info'}>Please <Link to={'/login'}>login</Link> to
                                                    write Review</Message>
                                            )}
                                        </ListGroup.Item>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong style={{textTransform: "uppercase"}}>{review.name}</strong>
                                                <Rating value={review.rating} color={'#f8e825'}/>
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )
            }
        </div>
    );
}
