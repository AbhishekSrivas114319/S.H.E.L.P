import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../../ApiServices/auth.service';
import '../Form.css';
import Alert from '../alert';
import Input from '../../../components/UI/Input/FormInput';
import MainPage from '../../../components/UI/MainPage/MainPage';
import SpinnerButton from '../../../components/UI/Spinners/SpinnerButton';
import SumbitButton from '../../../components/UI/Buttons/SumbitButton';

class Otp extends Component {

    state = { 
            Form:{
                 Otp: {

                    placeholder: 'Enter your OTP',
                    value: "",
                    valid: false,
                    type: 'number',
                    error: " ",
                    msg: '',

                    validation: {
                        required: true,
                        minLength:6,
              
                    },

                    touched: false,
                
            },

        },
        loading:false,
        Signup_token:localStorage.getItem('token'),
        email:localStorage.getItem('email'),
        redirect:null,

        alert: {
            valid:localStorage.getItem('valid'),
            msg:localStorage.getItem('msg'),
            alertType:localStorage.getItem('type'),
        }
       
    }
    

    AlertError(alertmsg, alertType) {
        const AlertArray = {...this.state.alert};
        AlertArray.msg = alertmsg;
        AlertArray.valid=true;
        AlertArray.alertType=alertType;
        this.setState({alert:AlertArray});
    
    }
    
    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid =value.trim()!=='' && isValid;
        }

        return isValid;
        
     }


//   runs whenever there is any change in the input field
    inputchangeHandler = (event,inputIdentifier)=> {

        const updatedForm = {
            ...this.state.Form
        }
        const updatedElement = {...updatedForm[inputIdentifier]}
     
        updatedElement.value = event.target.value;

        if(updatedElement.value.length>0) 
            updatedElement.touched=true;

        else {updatedElement.touched=false;
              updatedElement.error="";  
        }
        
        updatedElement.valid = this.checkValidity(updatedElement.value,
            updatedElement.validation);

        updatedForm[inputIdentifier] = updatedElement;
        this.setState({Form: updatedForm});

    }
   
    OverallValidity = ()=>{

        for(let validate in this.state.Form){
            if(!this.state.Form[validate].valid){
                return false;
            }
        }
        return true;
    }


    formHandler = (event)=> {
        event.preventDefault();
         
        if(this.OverallValidity()){
            this.setState({loading:true});
        
            let formData ={};

            for(let formElement in this.state.Form){
                    formData[formElement]=this.state.Form[formElement].value
            }

            formData.token = this.state.Signup_token;
           
            
            AuthService.otp(formData)
            .then(response => {console.log('Response:', response) 

            if(response.status ===201 || response.status ===200) 
              
                { 
                 
                 this.setState({loading:false})    


                 localStorage.removeItem('token') 
                 localStorage.removeItem('email') 
                 localStorage.removeItem('valid') 
                 localStorage.removeItem('msg') 
                 localStorage.removeItem('type') 

                 localStorage.setItem('user',response.data.token); 
                 this.setState({redirect:'/HomePage'})
                 window.location.reload();
            
                }
               
            else if(response.status===401) alert("Something went wrong")})
            
            .catch(error=>{console.log(error); this.setState({loading:false});
             this.AlertError("Make sure the Validations are correct", "danger");});

            
            
           
        }
        else this.AlertError("Make sure the Validations are correct", "warning");

    }

    resendotp = ()=>{
        let formData ={};
        formData.token=this.state.Signup_token;
        formData.email=this.state.email;
       
        

        AuthService.otpResend(formData)
            .then(response => {console.log('Response:',response)
            this.AlertError("Please Check Your Email, Otp has been Re-sent to your Email Address", "success");
            if(response.status ===201 || response.status ===200) 
                {localStorage.removeItem('token') 
                 localStorage.removeItem('email') 
               
                }
            else alert("Something went wrong")})

            .catch(error=>{console.log(error); 
                this.AlertError("Make sure the Validations are correct", "warning")});
        
    }


    render() {
       
    
        let alertContent = null;


        if(this.state.alert.valid){
            alertContent = ( <Alert alertMsg ={this.state.alert.msg} alertType={this.state.alert.alertType} /> )
        }

        
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        const formElementsArray =[];
        for(let key in this.state.Form ){
            formElementsArray.push({
                id:key,
                config:this.state.Form[key]
            });

        };

        let SigninSumbitButton= <SumbitButton className={"Sumbit-btn"} Label={"Confirm OTP"}/>;
   
        if(this.state.loading){
            SigninSumbitButton= <SpinnerButton spinnerclass={"Sumbit-btn"}/>;
    }

        let form = (
          <div className="login-form">
              
            <form onSubmit={this.formHandler} >
            
                {
                    formElementsArray.map(x=> (

                      <Input 
                        key={x.id}
                        placeholder={x.config.placeholder}
                        value={x.config.value}
                        type={x.config.type}
                        invalid={!x.config.valid}
                     //   touched={x.config.touched}
                       errors={x.config.error}
                     //   msg={x.config.msg}
                        changed={(event)=> this.inputchangeHandler(event,x.id)}/>

                    ))
                }
               <p className="forgot-password" onClick={this.resendotp}> Resend Otp?</p>
                {SigninSumbitButton}
                <p className="account-login"> Already have an account? <a href="/">Login</a></p>
                 <hr/>
         
            </form> 
            </div>
        );

        return (<div>
            {alertContent}
      
            <div className="SideContent">
                
                <MainPage 
                heading1={"Please Confirm "}
                heading2={"your Email Address"}/>

                    {form}
            </div>
              </div>
        );
    }
  
}


export default Otp;