import React, {Component} from 'react';
import Categories from './Categories';
import HomeBanner from './HomeBanner';
import CourseCards from './CourseCards';
import CourseTitle from './CourseTitle';
import {NavLink} from 'react-router-dom'
//import ProductApi from './../../../ApiServices/ProductApi';
import axios from "../../../ApiServices/axiosUrl";
import Recommendation from './Recommendation';
import './CSS/Homepage.css';



class Homepage extends Component {

    state = {
        CourseLink: this.props.match.params.CourseName,
        Courses: null,
        loading: true,
    }


    componentDidMount(){
      
        axios.post(`/home/${this.state.CourseLink}` )
        .then(response => {
            console.log("Courses Response",response);
       
            this.setState({Courses: response.data.course});
            console.log('courses state chaged, courses fetched')
            this.setState({loading:false});
            console.log(this.state);

        })
        .catch(error => {
            console.log(error);
        })
       
    }

    
    


    render(){
        console.log(this.state.CourseLink)

        let data = (<p>Loading...</p>);

        if(!this.state.loading){
           
            let CourseArray= this.state.Courses.slice(0,8);

            data = (
              CourseArray.map(item =>  
              
              <CourseCards   
                key={item.id}
                title={item.title}
                teacher={item.name}
                />)
    
            );
            


            };
        
        return(
          
            <div className="container">

                <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <NavLink strict to='/home'>
                                    Home
                                </NavLink></li>

                            <li class="breadcrumb-item">
                                <NavLink to={`/Home/${this.state.CourseLink}`}activeStyle={{textDecoration:'underline'}}>{this.state.CourseLink}
                                </NavLink>
                            </li>

                        </ol>
                
                </nav>

                <HomeBanner/>

                <div className="mt-5 Course-Content"> 
                    <Categories/>
                    <div className="Course-Content-col">
                   
                                <CourseTitle/>

                                <div className="Course-Content-wrap">
                                    {data}
                                </div>


                                <Recommendation/>

                    </div>

                </div>



            </div>
        );
    }

}

export default Homepage;