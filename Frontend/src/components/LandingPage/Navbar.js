import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Navigate} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);

        //maintain the state required for this component
        this.state = {
            keyword: "",
            searchFlag: false
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentWillMount(){
        this.setState({
            searchFlag : false
        })
    }

    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    handleSearch = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    submitSearch = () => {
        e.preventDefault();
        this.setState({
            searchFlag: true
        })
    }

    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if (this.state.searchFlag){
            let url = "/search/"+this.state.keyword;
            redirectVar = <Navigate to= {url}/>
        }

        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand">My Etsy App</a>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav">
                            <li class="active"><Link to="/home">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/user">User</Link></li>
                            <li><Link to="/delete">Cart</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </ul>
                        <form class="d-flex">
                            <input onChange = {this.handleSearch} class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button onClick = {this.submitSearch} class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        </div>
                    { navLogin }
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;