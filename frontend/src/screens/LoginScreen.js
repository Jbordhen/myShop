import { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import FormContainer from '../Component/FormContainer'
import { login } from '../actions/userActions.js'
import Message from '../Component/Message'
import Loader from '../Component/Loader'

const LoginScreen = (location) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const history = useHistory()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            console.log(redirect)
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sing in</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary'>
                    <i className='fas fa-sign-in-alt'></i>Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link
                        to={
                            redirect
                                ? `/register/redirect=${redirect}`
                                : '/redirect'
                        }>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
