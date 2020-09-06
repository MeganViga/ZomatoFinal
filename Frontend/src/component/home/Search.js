import React,{Component} from 'react'


var url = "http://localhost:8900/location";
var resurl ="http://localhost:8900/restauranthome?city=";

class Search extends Component{

  constructor(props) {
    super(props)
    this.state={
      location:'',
      city:'',
      restaurant:''
    }

}
handleLocation = (data) => {
  var dup =[]
 if(data){

  for(var i =0;i<data.length;i++){
    var flag = 0
    for(var j=0;j<dup.length;j++){
      if(dup[j]['city'] === data[i]['city'])
      {
        flag = 1
        break;
      }
    }
    if(flag===0)
    { 
      dup.push(data[i])

    }
  }
  
  return(dup.map((item) => {
    return(
      <option className="search" value={item.city} data-icon="./shutterstock_1154073754.png" class="rounded-circle">{item.city_name}</option>
    )
  }))


 }
  }
handleCity =(event) => {
    this.setState({city:event.target.value})
    var city = parseFloat(event.target.value);
    sessionStorage.setItem('city',event.target.value)
    fetch(`${resurl}${city}`,{method:'GET'}).then((res) => res.json()).then((data) => { this.setState({restaurant:data})})

}

handlerestaurantsearch = (event) => {
 this.props.history.push(`/restdetails/${parseInt(event.target.value)}`)

}
handleRestaurant = (data) => {
  if(data){
    return(
      data.map((item) => {
        return(
         <option className="search" value={item._id} data-icon="glyphicon-music" >
           
         {item.name}
       
       </option>
        
          

        )
      })
    )
  }
}
render(){
  return(
    <div className="container">
      <div className="container-fluid"><p id="find-rest">Find the Best restaurants, cafes and bars</p></div>
    
      <div className="container-fluid pt-5 pt-md-5 pt-lg-0">
      <div id="inputboxes" className="row d-flex justify-content-center">
        <select id="inputbox" className="inputbox col-10 col-sm-3"  placeholder="Please type a location" onChange={this.handleCity}>
       <option  class="placeholder" value=""
            hidden
             >Please select a location</option>
          {this.handleLocation(this.state.location)}
         
        </select>
        <select  id ="inputbox" className=" ml-md-2 inputbox col-10 col-sm-3"  onChange={this.handlerestaurantsearch} placeholder="Search for restaurants">
        <option class="placeholder" value=""
            hidden
           >
            Search for restaurants</option>
        {this.handleRestaurant(this.state.restaurant)}
        </select>
      </div>

      </div>

  </div>
  )

}
  componentDidMount(){
    fetch(url,{method:'GET'}).then((res) => res.json()).then((data) => {return(
      this.setState({location:data})
    )})
  }
}
export default Search
