import React,{Component, Fragment} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './tabs.css'
import Axios from 'axios';
const url = "http://localhost:8900/restaurantdetail/"
class Details_Tab  extends Component{
  constructor(props){
    super(props)
    this.state ={
      restdetails:[],
      restaurantname:''
    }
  }
  updatename = (data) => {
    if(data){
      return data.map((item)=>{
        return (
          <p style={{fontSize:30}}>{item.name}</p>
        )
      
      })
    }
  }
  handlerest = (data) => {
   if(data){
    
     return data.map((item) => {
       return(
        <Fragment>
          <TabPanel>
          <div>
            <br/>
  <h4>About this place</h4>
  <br />
  <h5>Cuisine</h5>
  <br />
       <h6 style={{fontWeight: 'lighter', fontSize: 15}}>{item.Cuisine.map((cui) => {
        return cui.name + ','
       })}</h6>
  <br />
  <h5>Average Cost</h5>
  <br />
  <h6 style={{fontWeight: 'lighter', fontSize: 15}}>
    ₹{item.cost} for two people (approx.)
  </h6>
</div>

    </TabPanel>
    <TabPanel>
   <div>
  <h5 style={{fontSize: 18}}>Phone number</h5>
      <p style={{color: '#f67082'}}>+91 {item.contact_number}</p>
  <br />
      <p style={{fontSize: 18, fontWeight: 600}}>{item.name}</p>
  <p style={{fontSize: 16, color: '#636f88'}}>{item.address}
  </p>
</div>

    </TabPanel>
        </Fragment>
           

       )
     })
   }
  }
  render(){
return(
  <div className="container cust-tab px-sm-0">
      {this.updatename(this.state.restdetails)}
       <Tabs>
    <TabList>
      <Tab >Overview</Tab>
      &nbsp;&nbsp;&nbsp;
      <Tab >Contact</Tab>
    </TabList>
     {this.handlerest(this.state.restdetails)}
    
   </Tabs>
      </div>
)
  }
  componentDidMount(){
    Axios.get(`${url}${parseInt(this.props.data)}`).then((response) => {
      this.setState({restdetails:response.data})
    })
  
  

  }

} 



 
export default Details_Tab




