import React ,{Component}from 'react'
import {Link} from 'react-router-dom'
import './Details.css'
import Emoji from 'a11y-react-emoji';
import Pagination from 'react-js-pagination'


var rest = "http://localhost:8900/restaurantlist/"
var cuisineurl = "http://localhost:8900/cuisine"
class Details extends Component{
    constructor(props){
        super(props)
        this.state={
            city:parseInt(sessionStorage.getItem('city'))?parseInt(sessionStorage.getItem('city')):1,
            restaurantlist:[],
            cuisine:[],
            activePage:1,
            totalNoOfItems:2
        }
        
    }
    handlerestaurant =(data) => {
        if(data.length === 0){
            return(
                <p className="pl-3">No Restaurants Available</p>
            )
        }
        else if(data){
            return(
                data.map((item) => {
                    var itemlength = item.Cuisine.length
                  return(
                   
                       
                            <div className="cust-card col-sm-8 col-10 mt-3 mt-sm-3 ml-sm-4 ml-4">
                                 <Link style={{textDecoration:'none'}}to={`/restdetails/${item._id}`}>
                               <div className="row">
                                   <div className="col-6" style={{paddingLeft:0}}>
                                       <img  className="img-responsive w-100 h-100" src={item.thumb} alt=""></img>

                                   </div>
                                   <div className="col-6 pt-3 cust-card-component" style={{textAlign:'left'}}>
                                        <p id="name"> <Emoji symbol="🏨" label="restaurant" /> {item.name}</p>
                                        <p><Emoji symbol="🗺 " label="map" />{item.locality}</p>
                                        <p><Emoji symbol="🍲" label="food" /> {item.Cuisine.map((item2,key) =>{ 
                                            if(key === itemlength -1){

                                                return item2['name']
                                            }
                                            else{
                                               return item2['name']+','
                                            }

                                            })}</p>
                                        <p><Emoji symbol="💰" label="money" /> Rs.{item.cost}</p>

                                   </div>

                               </div>
                               </Link>
                            </div>
                    
                   
                
                   
                  )
                })
                
            )
      
        }
    
    }
    handlecuisine = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <div className="mt-1">
                        <input type="radio" value={item._id} name="cuisine" /> {item.name}
                        <br/>
                    </div>
                    
                )
            })
        }

    }
    setCuisineFilter = (event) => {
        var varres = `${rest}${this.state.city}/${parseInt(this.props.match.params.id)}`
        var cuisine_id = event.target.value
        if(cuisine_id==="all"){
            fetch(`${varres}?cuisine=`,{method:'GET'}).then((res) => res.json()).then((data) => {
                this.setState({restaurantlist:data.slice(0,data.length - 1)})
            })
            
        }
        else{
            fetch(`${varres}?cuisine=${cuisine_id}`,{method:'GET'}).then((res) => res.json()).then((data) => {
                this.setState({restaurantlist:data.slice(0,data.length - 1)})
            })
        }
       
    }
    setCostFilter = (event) => {
        var varres = `${rest}${this.state.city}/${parseInt(this.props.match.params.id)}`
        var [lcost, hcost] = (event.target.value).split(",")
        fetch(`${varres}?lcost=${parseInt(lcost)}&hcost=${parseInt(hcost)}`,{method:'GET'}).then((res) => res.json()).then((data) => {
            this.setState({restaurantlist:data.slice(0,data.length - 1)})
        })

    }
    setSortFilter = (event) => {
        var varres = `${rest}${this.state.city}/${parseInt(this.props.match.params.id)}`
        var sort = parseInt(event.target.value)
        fetch(`${varres}?sort=${sort}`,{method:'GET'}).then((res) => res.json()).then((data) => {
            this.setState({restaurantlist:data.slice(0,data.length - 1)})
        })


    }
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        var varres = `${rest}${this.state.city}/${parseInt(this.props.match.params.id)}`
        fetch(`${varres}?page=${pageNumber}`,{method:'GET'}).then((res) => res.json()).then((data) => {
            this.setState({restaurantlist:data.slice(0,data.length - 1),totalNoOfItems:data[data.length - 1]["totalNoOfItems"]})
        })
      }
    
    render()
    {   
        return(
           <div className="container-fluid">
               <div className="row">
                   <div className="col-12 col-sm-2 pl-sm-5 pt-sm-5">
                       <div class="row">
                            <div className="col-6 col-sm-12">
                                <p className="side-heading mt-2" >Cuisine</p>
                                <div onChange={this.setCuisineFilter}>
                                <input className="mt-1" type="radio" value="all" name="cuisine" /> All
                                {this.handlecuisine(this.state.cuisine)}
                                </div>
                               
                            </div>
                            <div className="col-6 col-sm-12 " onChange={this.setCostFilter}>
                                <p className="side-heading mt-2">Cost</p>
                                <input className="" type="radio" value="0,400" name="cost" /> 0-400 Rs
                                <br/>
                                <input  className="mt-3" type="radio" value="400,700" name="cost" /> 400-700 Rs
                                <br/>
                            <input  className="mt-3" type="radio" value="700,1000" name="cost" /> 700-1000 Rs
                            </div>
                            <div className="col-6 col-sm-12 " onChange={this.setSortFilter}>
                                <p className="side-heading mt-2">Sort</p>
                                <input  className="mt-1" type="radio" value="1" name="Sort" /> Lower to Higher
                                <br/>
                                <input  className="mt-3" type="radio" value="-1" name="Sort" /> Higher to Lower
                           </div>

                       </div>
                     
                   </div>
                   <div className="col-12 col-sm-10 pt-sm-5 pl-sm-5" style={{textAlign:'left'}}>
                        <p className="availrest">Available restaurants</p>
                       <div className="row">
                       {this.handlerestaurant(this.state.restaurantlist)}
                       </div>
                       <br/>
                       <Pagination 
                        activePage={this.state.activePage}
                        itemsCountPerPage={2}
                        totalItemsCount={this.state.totalNoOfItems}
                        pageRangeDisplayed={2}
                        itemClass="page-item"
                        linkClass="page-link"
                        onChange={this.handlePageChange.bind(this)}
                      />
                        
                        
                     
                   
                    
                   </div>

               </div>

           </div>
        )
    }
    componentDidMount(){
       const meal = parseInt(this.props.match.params.id)
      fetch(`${rest}${this.state.city}/${meal}?page=${this.state.activePage}`,{method:'GET'}).then(res => res.json()).then((data) => {
          this.setState({restaurantlist:data.slice(0,data.length - 1),totalNoOfItems:data[data.length - 1]["totalNoOfItems"]})
      }

      )
      fetch(cuisineurl,{method:'GET'}).then(res => res.json()).then((data) => {
          this.setState({cuisine:data})
      })
    }
    
        
}
export default Details