import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Delete extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : 0,
            errorMsg: "",
            deleteFlag: false
        }
        //Bind the handlers to this class
        this.idChangeHandler = this.idChangeHandler.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
    }
    //Call the Will Mount to empty the error message
    componentWillMount(){
        this.setState({
            deleteFlag: false
        })
    }
    //Book ID change handler to update state variable with the text entered by the user
    idChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        })
    }

    //submit Delete handler to send a request to the node backend
    submitDelete = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            id : this.state.id
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.data === "Book deletion successful"){
                    this.setState({
                        deleteFlag : true
                    })
                }else{
                    this.setState({
                        deleteFlag : false,
                        errorMsg : "Book not found. Deletion failed"
                    })
                }
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
            redirectVar = <Redirect to= "/login"/>
        } else if (this.state.deleteFlag) {
            redirectVar = <Redirect to= "/home"/>
        }

        return(
            <div class="container">
                {redirectVar}
                <form>
                    <p style={{color: 'red'}}>{this.state.errorMsg}</p>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input onChange = {this.idChangeHandler} type="number" class="form-control" name="BookID" placeholder="Search a Book by Book ID"  min="1" required/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button onClick = {this.submitDelete} class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
        )
    }
}

export default Delete;