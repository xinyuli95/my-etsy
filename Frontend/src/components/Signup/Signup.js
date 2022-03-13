import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Signup Component
class Signup extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            email: "",
            signupFlag : false,
            errorMsg: ""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            signupFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
     //email change handler to update state variable with the text entered by the user
     emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //submit Signup handler to send a request to the node backend
    submitSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password,
            email: this.state.email
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log(data);
        axios.post('http://localhost:3001/signup',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.data === "User creation successful"){
                    this.setState({
                        signupFlag : true
                    })
                }else{
                    this.setState({
                        signupFlag : false,
                        errorMsg : response.data
                    })
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    signupFlag : false,
                    errorMsg : "Network error"
                })
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.signupFlag) {
            redirectVar = <Redirect to= "/"/>
        }

        return(
            <div>
                {redirectVar}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>User Signup</h2>
                            <p>Please enter your username and password</p>
                        </div>
                            <form action="http://127.0.0.1:3000/signup" method="post">
                                <p style={{color: 'red'}}>{this.state.errorMsg}</p>
                                <div class="form-group">
                                    <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                                </div>
                                <button onClick = {this.submitSignup} class="btn btn-primary">Sign Up</button>
                            </form>                
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default Signup;