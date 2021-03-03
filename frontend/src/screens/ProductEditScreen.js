import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import FormContainer from '../Component/FormContainer'

import Message from '../Component/Message'
import Loader from '../Component/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = ({ match }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setCategory(product.category)
                setImage(product.image)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [product, dispatch, productId, history, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                brand,
                category,
                countInStock,
                description,
                image
            })
        )
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant='danger'>{errorUpdate}</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Your Full Name'
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) =>
                                    setImage(e.target.value)
                                }></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) =>
                                    setBrand(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Count in stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter count in stock'
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
