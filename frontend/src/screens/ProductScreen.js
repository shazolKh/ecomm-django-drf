import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Image, ListGroup, Button} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

export default function ProductScreen({match}) {
    const [product, setProduct] = useState([])
    useEffect(() => {
        // console.log('Use Effect triggered')
        async function fetchProduct() {
            const {data} = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        fetchProduct();
    }, [match.params.id])

    return (
        <div>
            <Link to={'/'} className={'btn btn-light my-3'}>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant={"flush"}>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
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

                        <ListGroup.Item>
                            <Button className={'btn-block'} type={"button"} disabled={product.countInStock === 0}>
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}
