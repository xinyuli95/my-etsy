import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Navigate} from 'react-router';
import Navbar from '../LandingPage/Navbar';

class UserEdit extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            nameNew : '',
            name : '',
            errorMsg: "",
            deleteFlag: false
        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.submitNameChange = this.submitNameChange.bind(this);
    }
    //Call the Will Mount to empty the error message
    componentWillMount(){
        if(!cookie.load('cookie')){
            this.setState({
                name : ''
            })
        } else {
            this.setState({
                name : cookie.load('cookie')
            })
        }

        this.setState({
            deleteFlag: false
        })
    }
    //name change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            nameNew : e.target.value
        })
    }

    //submit Delete handler to send a request to the node backend
    submitNameChange = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            nameNew : this.state.nameNew,
            name: this.state.name
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/edit-user',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                this.setState({
                    name : this.state.nameNew,
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    deleteFlag : false,
                    errorMsg : "Unknown error. See console"
                })
            });
    }

    render(){
        //if not logged in go to login page
        let redirectVar = null;

        if(!cookie.load('cookie')){
            redirectVar = <Navigate to= "/login"/>
        } 

        return(
            <div class="container">
                {redirectVar}
                <div><Navbar/></div>
                <form>
                    <p style={{color: 'red'}}>{this.state.errorMsg}</p>
                    <div class="container">
                    <h2>{  this.state.name }</h2>
                        <div class="row">
                            <div class="col">
                                <div class="item">
                                    <div class="name"> Name:  { this.state.name }</div> 
                                    <div style={{width: "50%",float: "left"}} class="form-group">
                                        <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Edit name"  required/>
                                    </div>
                                    <div style={{width: "50%", float: "right"}}>
                                            <button onClick = {this.submitNameChange} class="btn btn-success" type="submit">Edit</button>
                                    </div>                  
                                </div>   
                            </div>
                        </div>                
                    </div> 
                    
                </form>
            </div>
        )
    }
}

export default UserEdit;