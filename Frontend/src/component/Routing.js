import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Header from './singlerestdetails/Details_Header'
import Home from './home/Home'
import Details from './allrestaurandetails/Details'
import RestDetails from "./singlerestdetails/RestDetails"
import Footer from './home/Footer'



const Router = () => {
    return(
        <BrowserRouter>
        <Header/>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/details/:id" component={Details}></Route>
        <Route exact path="/restdetails/:id" component={RestDetails}></Route>
        <br/>
        <Footer/>
        </BrowserRouter>
    )
}
export default Router