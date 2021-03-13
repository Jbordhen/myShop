import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel pause='hover' className='bg-dark' interval={3000}>
            {products &&
                products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                style={{
                                    height: 300,
                                    padding: 30,
                                    margin: 40,
                                    borderRadius: '50%',
                                    marginLeft: 'auto',
                                    marginRight: 'auto'
                                }}
                                fluid
                            />
                            <Carousel.Caption className='carousel-caption'>
                                <h2>
                                    {product.name} ({product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
        </Carousel>
    )
}

export default ProductCarousel
