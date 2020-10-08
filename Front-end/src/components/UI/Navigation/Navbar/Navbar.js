import React, {Component} from 'react';
import './Navbar.css';
import {NavLink,Redirect} from 'react-router-dom';

import Logo from '../../../UI/Logo/Logo';
//import ProfileLogo from '../../../UI/Logo/profileLogo';
//import SideToggler from '../../SideNav/SideToggler/SideToggler';
import AuthServices from '../../../../ApiServices/auth.service';

class Navbar extends Component {
    
    state = {
        isLoggedIn:false,
        userName:"Profile",
        redirect:null,
    }

    componentDidMount(){
        let userToken = AuthServices.getCurrentUser();
        let userName= AuthServices.getUserName();
        if(userToken!==null){
            this.setState({isLoggedIn:true,userName:userName});
        }

        
        
     }

     logout=() => {
       this.setState({redirect:"/login"})
        AuthServices.logout();
       // alert(localStorage.getItem('user'))
        
      window.location.reload();

    }



    render(){
     // console.log(localStorage.getItem('user'));

       if (this.state.redirect) {
            return <Redirect to="/login" />
        }

        let LoginLinks = ( <ul className="navbar-nav ml-auto">


        <li className="nav-item">
          
          <NavLink to="/teacherhome" activeClassName="teacherActive" className="nav-link teachLink">Teach on Shelp</NavLink>
        </li>
      
       

        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Teacher
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                  <NavLink activeClassName="active-category" className="dropdown-item" to='/home/all'>Profile</NavLink>
                  <NavLink activeClassName="active-category" className="dropdown-item" to='/Teacher' >Upload Content</NavLink>
                  

           
            </div>
        </li>

        <li className="nav-item dropdown usere">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-user" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

            <NavLink to="/course"  activeClassName="active-category" className="dropdown-item profilelink">{this.state.userName}</NavLink>
            <NavLink to="/Cart" activeClassName="active-category" className="dropdown-item wishlistlink">
             Bookmarked</NavLink>
                  

           
            </div>
        </li>

         
        <li className="nav-item">
          <NavLink to="/" className="nav-link logoutlink" onClick={this.logout}>Logout</NavLink>
         
        </li>
      </ul>
      );

      if(localStorage.getItem('user') === null){

        LoginLinks =( <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                <NavLink to="/teacherhome" activeClassName="teacherActive" className="nav-link teachLink"  >Teach on Shelp</NavLink>
                </li>

                <li className="nav-item">
                
                <NavLink to="/signup" activeClassName="btnactive" className="nav-link Signupbtn">Signup</NavLink>
                
                </li>
            
                <li className="nav-item">
                <NavLink to="/login" activeClassName="btnactive" className="nav-link Loginbtn">Login</NavLink>
                
                </li>

                
               
      </ul>
        )}

       
    return(
  

<nav className=" navbar navbar-expand-lg sticky-top ">

  <NavLink to="/home/all" className="navbar-brand"><Logo/></NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" 
  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
   aria-label="Toggle navigation">
  <i className="fa fa-bars" aria-hidden="true"></i>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav mr-auto">

    <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                  <NavLink  className="dropdown-item" to='/home/all' activeClassName="active-category" >All Courses</NavLink>
                   <NavLink className="dropdown-item" to='/home/Web Development' activeClassName="active-category">Web Development </NavLink>
                   <NavLink className="dropdown-item" to='/home/Web Designing' activeClassName="active-category" >Web Designing </NavLink>
                   <NavLink className="dropdown-item" to='/home/React' activeClassName="active-category">React</NavLink>
                    <NavLink className="dropdown-item" to='/home/NodeJs' activeClassName="active-category">NodeJs</NavLink>
                   <NavLink className="dropdown-item" to='/home/ML' activeClassName="active-category">Machine Learning </NavLink>
                   <NavLink className="dropdown-item" to='/home/Photography' activeClassName="active-category">Photography</NavLink>
                   <NavLink className="dropdown-item" to='/home/IOT' activeClassName="active-category">IOT </NavLink>


           
            </div>
        </li>
    </ul>

    {LoginLinks}
    
  </div>
</nav>

)}
};

export default Navbar;