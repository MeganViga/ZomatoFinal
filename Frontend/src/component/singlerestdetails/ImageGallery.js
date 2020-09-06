import React,{Component} from 'react'
import './ImageGallery.css'
import axios from 'axios'
const url = "http://localhost:8900/restaurantdetail/"
class Imagegallery extends Component{
    constructor(props){
        super(props)
        this.state={
            restaurantdetail:[]
        }
    }
    handleimage = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <div class="col-md mt-md-2 px-0">
                <img id = "image" className="img-responsive" src={item.thumb} alt=""/>
                <button type="button" className="btn cust-butt btn-lg">Click to see Image Gallery</button>
            </div>
                )
            })
        }
    }
    render(){
        return(
            <div className="container cust-contain mt-md-5 px-0">
            {this.handleimage(this.state.restaurantdetail)}
        </div>
        )

    }
    componentDidMount(){
        axios.get(`${url}${parseInt(this.props.data)}`).then((response) => {
            this.setState({restaurantdetail:response.data})
          })
        

    }
}


 export default Imagegallery