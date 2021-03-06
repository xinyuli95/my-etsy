import React, {Component} from 'react';
import {Routes, Route, Switch} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
import Search from './Search/Search';
import User from './User/User';
import UserEdit from './User/UserEdit';
import Shop from './Shop/Shop';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                <Routes>
                    {/*Render Different Component based on Route*/}
                    <Route path="/" element={<Navbar />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/delete" element={<Delete />}/>
                    <Route path="/shop" element={<Shop />}/>
                    <Route path="/signup" element={<Signup />}/>
                    <Route path="/search/:id" element={<Search />}/>
                    <Route path="/user" element={<User />}/>
                    <Route path="/edit-user" element={<UserEdit />}/>
                    <Route path="/create" element={<Create />}/>
                </Routes>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;