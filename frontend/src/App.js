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
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Container>
                    <Route path='/order/:id' component={OrderScreen}></Route>
                    <Route
                        path='/placeorder'
                        component={PlaceOrderScreen}></Route>
                    <Route path='/payment' component={PaymentScreen}></Route>
                    <Route path='/shipping' component={ShippingScreen}></Route>
                    <Route path='/login' component={LoginScreen}></Route>
                    <Route path='/register' component={RegisterScreen}></Route>
                    <Route path='/profile' component={ProfileScreen}></Route>
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
