import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            items : []
        }
     

        this.addFavorite = this.addFavorite.bind(this);
    } 

    addFavorite = (e) => {
        console.log(e.target.value)
    }

    //get the items data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    items : this.state.items.concat(response.data) 
                });
            });
    }

    render(){
        //iterate over items to create a table row
        let details = this.state.items.map(item => {
            return(
                <div class="col">
                    <div class="item">
                        <div class="name"> {item.itemID} </div>
                        <div class="price"> {item.price} </div>     
                        <button value={item.itemID} onClick = {this.addFavorite} class="btn btn-primary">Favorite</button>                 
                    </div>   
                </div>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All items</h2>
                        <div class="row">
                            { details }
                        </div>                
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;