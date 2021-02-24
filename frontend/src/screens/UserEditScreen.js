import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import FormContainer from '../Component/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions.js'
import Message from '../Component/Message'
import Loader from '../Component/Loader'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.pushState('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, user, userId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
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
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isAdmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin?'
                                checked={isAdmin}
                                onChange={(e) =>
                                    setIsAdmin(e.target.checked)
                                }></Form.Check>
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

export default UserEditScreen
