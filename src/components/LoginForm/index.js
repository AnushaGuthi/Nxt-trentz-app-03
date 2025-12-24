import {Component} from 'react';
import {Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';

import './index.css';

class LoginForm extends Component{

    state={
        username:'',
        password:'',
        showSubmitError:false,
        errorMsg:'',
        redirect:false
    }

    

    onSubmitSuccess=jwtToken=>{
        Cookies.set('jwt_token', jwtToken, {
            expires: 30,
        })
        this.setState({redirect:true})
        
    }

    onSubmitFailure=errorMsg=>{
        this.setState({showSubmitError:true,errorMsg})
    }

    submitForm= async event=>{
        event.preventDefault()
        const {username,password}=this.state
        const userDetails={username,password}
        const url="https://apis.ccbp.in/login"
        const options={
            method: 'POST',  
            body: JSON.stringify(userDetails),
        }
        
        const response=await fetch(url,options)
        const data=await response.json()
        
        if (response.ok===true){
            this.onSubmitSuccess(data.jwt_token)
        }else{
            this.onSubmitFailure(data.error_msg)
        }
    }

    
    renderPasswordFeild=()=>{
        const {password}=this.state
        return(
            <>
            <label className="input-label" htmlFor="password">
                PASSWORD
            </label>
            <input type="password" id='password' className="password-input-field" value={password} placeholder="PASSWORD" onChange={this.onChangePassword}/>
            </>
        )

    }

    renderUserNameFeild=()=>{
        const {username}=this.state
        return(
            <>
            <label className="input-label" htmlFor="username">
                USERNAME
            </label>
            <input type="text" id='username' className="username-input-field" value={username} placeholder="USERNAME" onChange={this.onChangeUsername}/>
            </>
        )

    }


    render(){
        const {showSubmitError,errorMsg,redirect}=this.state

        if (redirect===true){
            return <Navigate to='/' replace/>
        }
        return(
            <div className="login-form-container">
               <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" className="login-website-logo-mobile-img"/>
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" alt="website login" className='login-img'/>
                <form className="form-container" onSubmit={this.submitForm}>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" className="login-website-logo-desktop-img"/>
                    <div className="input-container">{this.renderUserNameFeild()}</div>
                    <div className="input-container">{this.renderPasswordFeild()}</div>
                    <button type="submit" className="login-button">Login</button>
                    {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                </form>
            </div>


        )
    }
}

export default LoginForm;