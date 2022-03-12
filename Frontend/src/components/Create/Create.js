import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Create extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            id : 0,
            title : "",
            author : "",
            errorMsg: "",
            addFlag: false
        }
        //Bind the handlers to this class
        this.idChangeHandler = this.idChangeHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.authorChangeHandler = this.authorChangeHandler.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
    }
    //Call the Will Mount to empty the error message
    componentWillMount(){
        this.setState({
            addFlag: false
        })
    }
    //Book ID change handler to update state variable with the text entered by the user
    idChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        })
    }
    //Title change handler to update state variable with the text entered by the user
    titleChangeHandler = (e) => {
        this.setState({
            title : e.target.value
        })
    }

    //Author change handler to update state variable with the text entered by the user
    authorChangeHandler = (e) => {
        this.setState({
            author : e.target.value
        })
    }

    //submit Create handler to send a request to the node backend
    submitCreate = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            id : this.state.id,
            title : this.state.title,
            author : this.state.author
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.data === "Book creation successful"){
                    this.setState({
                        addFlag : true
                    })
                }else{
                    this.setState({
                        addFlag : false,
                        errorMsg : "Duplicate book id. Creation failed"
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
            redirectVar = <Redirect to= "/login"/>
        } else if (this.state.addFlag) {
            redirectVar = <Redirect to= "/home"/>
        }

        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                    <form action="http://127.0.0.1:3000/create" method="post">
                        <p style={{color: 'red'}}>{this.state.errorMsg}</p>
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.idChangeHandler} type="number" class="form-control" name="BookID" placeholder="Book ID" min="1" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.titleChangeHandler} type="text" class="form-control" name="Title" placeholder="Book Title" maxLength="30" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.authorChangeHandler} type="text" class="form-control" name="Author" placeholder="Book Author" maxLength="30" required/>
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