import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Navigate} from 'react-router-dom';
import Navbar from '../LandingPage/Navbar';

class Create extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            shopID : "",
            owner : "",
            errorMsg: "",
            addFlag: false
        }
        //Bind the handlers to this class
        this.idChangeHandler = this.idChangeHandler.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
    }
    //Call the Will Mount to empty the error message
    componentWillMount(){
        const name = cookie.load('cookie')
        if(!name){
            this.setState({
                owner : ''
            })
        } else {
            this.setState({
                owner : name
            })
        }
        this.setState({
            addFlag: false
        })
    }
    //Book ID change handler to update state variable with the text entered by the user
    idChangeHandler = (e) => {
        this.setState({
            shopID : e.target.value
        })
    }

    //submit Create handler to send a request to the node backend
    submitCreate = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            shopID : this.state.shopID,
            owner : this.state.owner
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.data === "Shop creation successful"){
                    this.setState({
                        addFlag : true
                    })
                }else{
                    this.setState({
                        addFlag : false,
                        errorMsg : "Duplicate shop. Creation failed"
                    })
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    addFlag : false,
                    errorMsg : "Unknown error. See console"
                })
            });
    }

    render(){
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Navigate to= "/login"/>
        } else if (this.state.addFlag) {
            redirectVar = <Navigate to= "/shop"/>
        }

        return(
            <div>
                {redirectVar}
                <br/>
                <div><Navbar/></div>
                <div class="container">
                    <form action="http://127.0.0.1:3000/create" method="post">
                        <h2>{  this.state.owner }</h2>
                        <p style={{color: 'red'}}>{this.state.errorMsg}</p>
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.idChangeHandler} type="text" class="form-control" name="shopID" placeholder="Shop ID" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitCreate} class="btn btn-success" type="submit">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;