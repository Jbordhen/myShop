import { useEffect, useState } from 'react'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'
import Message from '../Component/Message'
import Loader from '../Component/Loader'
import { listOrder } from '../actions/orderActions.js'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderList = useSelector((state) => state.orderList)
    const { loading: loadingOrders, error: errorOrders, orders } = orderList

    const history = useHistory()

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listOrder())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{error}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && (
                    <Message variant='success'>Profile Updated</Message>
                )}
                {loading && <Loader />}
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
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        <i className='fas fa-sign-in-alt'></i>Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    {console.log(order)}
                                    <td>{order.timestamp}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.subString(0, 10)
                                        ) : (
                                            <i
                                                className='fas fa-times'
                                                style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.subString(0, 10)
                                        ) : (
                                            <i
                                                className='fas fa-times'
                                                style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}>
                                            <Button
                                                className='btn-sm'
                                                variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
