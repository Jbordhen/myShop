import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../Component/CheckoutSteps'
import FormContainer from '../Component/FormContainer'

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch(saveShippingAddress)

    const history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Full Address'
                        value={address}
                        required
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your City'
                        value={city}
                        required
                        onChange={(e) =>
                            setCity(e.target.value)
                        }></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your PostalCode'
                        value={postalCode}
                        required
                        onChange={(e) =>
                            setPostalCode(e.target.value)
                        }></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Country'
                        value={country}
                        required
                        onChange={(e) =>
                            setCountry(e.target.value)
                        }></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
