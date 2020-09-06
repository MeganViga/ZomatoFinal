import React from 'react'
import "./Home.css"
import Search from './Search.js'
import QuickSearch from './QuickSearch'
const Home = (props) => {
    return(
        <div >
        <div className="container-fluid cust-cont cust-top-container">
            <div className="Logo m-auto">
                <p id="Logo_text">e!</p>
            </div>
            
            <Search history = {props.history}/>
           
           
        </div>
        <div className="container-fluid">
        <QuickSearch/>
        </div>
        
         </div>

    )
}
 export default Home
