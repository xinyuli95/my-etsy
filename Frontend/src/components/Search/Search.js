import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Navigate} from 'react-router';
import Navbar from '../LandingPage/Navbar';
import Items from './Items';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";
/*
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
  
function withRouter(Component) {
   function ComponentWithRouterProp(props) {
       let location = useLocation();
       let navigate = useNavigate();
       let params = useParams();
       return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
}
*/
class Search extends Component {
    constructor(){
        super();
        this.state = {  
            items : [],
            keyword: ""
        }
     

        this.addFavorite = this.addFavorite.bind(this);
        this.getID = this.getID.bind(this);
    } 

    addFavorite = (e) => {
        console.log(e.target.value)
    }

    getID() {
        const { id } = useParams();
        console.log(id);
    }

    //get the items data from backend
    /*  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    items : this.state.items.concat(response.data) 
                });
            });
    }
    */

    render(){
        
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Navigate to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div><Navbar/></div>
                <div class="container">
                    
                    <h2>List of All items</h2>
                        <div class="row">
                            <div><Items/></div>
                        </div>                
                </div> 
            </div> 
        )
    }
}
//export Search Component
export default Search;