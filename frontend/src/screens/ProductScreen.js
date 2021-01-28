import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import Loader from '../Component/Loader'
import Message from '../Component/Message'
import Rating from '../Component/Rating'

const ProductScreen = ({ history, match }) => {
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)

    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [match, dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`)
    }

    return (
        <>
            <Link to='/'>
                <Button className='btn btn-gray my-3'>
                    <i className='fas fa-chevron-left'></i>
                </Button>
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    numOfReviews={product.numOfReviews}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price:${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>{product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0
                                                ? 'In Stock'
                                                : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={quantity}
                                                    onChange={(e) =>
                                                        setQuantity(
                                                            e.target.value
                                                        )
                                                    }>
                                                    {[
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys()
                                                    ].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'>
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default ProductScreen
