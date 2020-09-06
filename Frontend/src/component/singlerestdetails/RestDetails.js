import React from 'react'
import ImageGallery from './ImageGallery'
import Detailstab from './tabs'


const RestDetails = (props) => {
    return(
        <div>
            <ImageGallery data={props.match.params.id}/>
            <div className="container mt-5 " style={{padding:0,marginTop:10}}>
            <Detailstab data={props.match.params.id} />
            </div>
        </div>
    )
}
export default RestDetails