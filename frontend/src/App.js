import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './Component/Footer'
import Header from './Component/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Container>
                    <Route path='/login' component={LoginScreen}></Route>
                    <Route path='/register' component={RegisterScreen}></Route>
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
