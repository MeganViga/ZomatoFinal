import React,{Component} from 'react'
import { Link } from 'react-router-dom';
var mealtypeurl = "http://localhost:8900/mealtype";
class QuickSearchDisplay extends Component{
    constructor(){
        super()
        this.state={
            mealtype:""
        }
    }
    handleQuickCards = (data) => {
        if(data){
            return(
                data.map((item) => {
                    var name = item.name
                     name = name.charAt(0).toUpperCase() + name.slice(1)
                    return(
                           
                         <div className="card cardmain   mt-4  ml-sm-0 mr-sm-5" >
                               <Link style={{ textDecoration: 'none' }} to={`/details/${item.mealtype}`}>
                        <img className=" img-responsive w-100" src="./shutterstock_1154073754.png" alt=""/>
                        <div class="card-body">
                        <h5 class="card-title card_name">{name}</h5>
                        <p class="card-text goodfood" >Have a Good food</p>
                    </div>
                    </Link>
                    </div>
                       
        
                       
                       
                        
                    )
                })
            )
        }

    }
    render(){
        return(
            <div className="row mb-5 pl-3 d-flex justify-content-center" >
                {this.handleQuickCards(this.state.mealtype)} 
            </div>
        )
    }
    componentDidMount(){
        fetch(mealtypeurl,{method:'GET'}).then((res) => res.json()).then((data) => {
            this.setState({mealtype:data})
        })
    }

}

export default QuickSearchDisplay