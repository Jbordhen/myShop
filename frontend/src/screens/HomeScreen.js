import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Form } from 'react-bootstrap'
import Product from '../Component/Product'
import { listProducts } from '../actions/productActions.js'
import Loader from '../Component/Loader.js'
import Message from '../Component/Message.js'
import Paginate from '../Component/Paginate'
import ProductCarousel from '../Component/ProductCarousel'
import Meta from '../Component/Meta'
import { Link } from 'react-router-dom'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const [sortBy, setSortBy] = useState(match.params.sortBy || '-createdAt')

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, pages, page } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, sortBy))
    }, [dispatch, keyword, pageNumber, sortBy])

    return (
        <>
            <Meta />
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to='/' className='btn btn-light'>
                    Go Back
                </Link>
            )}
            <Row>
                <Col>
                    <h1>Latest Products </h1>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Form.Control
                                as='select'
                                style={{
                                    width: 'auto'
                                }}
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}>
                                <option value='-createdAt'>
                                    Sort By: Latest Products
                                </option>
                                <option value='price'>Price Low to High</option>
                                <option value='-price'>
                                    Price High to Low
                                </option>
                                <option value='-rating'>Average Rating</option>
                                <option value='-numOfReviews'>
                                    Most Reviews
                                </option>
                            </Form.Control>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default HomeScreen
