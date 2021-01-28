import { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import FormContainer from '../Component/FormContainer'
import { register } from '../actions/userActions.js'
import Message from '../Component/Message'
import Loader from '../Component/Loader'

const RegisterScreen = (location) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const history = useHistory()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sing Up</h1>
            {message && <Message variant='danger'>{error}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                    <i className='fas fa-sign-in-alt'></i>Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account?{' '}
                    <Link
                        to={
                            redirect ? `/login/redirect=${redirect}` : '/login'
                        }>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
