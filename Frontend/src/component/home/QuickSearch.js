import React from 'react'
import QuickSearchDisplay from './QuickSearchDisplay'

const QuickSearch =() => {
    return(
        <div className="container-fluid mt-5 pl-sm-5" >
            <h1 class="quick" style={{textAlign:'center'}}>Quick Searches</h1>
            <h4 class="quick discover" style={{textAlign:'center'}}>Discover restaurant by type of meal</h4>
            <QuickSearchDisplay/>
        </div>
    )
}

export default QuickSearch