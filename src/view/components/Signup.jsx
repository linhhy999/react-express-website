import React from 'react';
import T from '../js/common';
import { Link } from 'react-router-dom';
const $ = window.$;

class Signup extends React.Component {
    state = { apiMessage: null };
    emailVisited = false;

    componentDidMount() {
        
    }
    signup = (e) => {
        e.preventDefault();
        if ($("#password").val() == $("#confirmPassword").val()) {
            let data = {
                email: $("#email").val(),
                username: $("#username").val(),
                password: $("#password").val(),
                confirmPassword: $("#confirmPassword").val(),
                name: $("#name").val()
            }
            T.post("/signup", data,
                data => console.log('data:',data),
                error => T.notify('error:' + error, "danger"));
        }
    }

    validEmail = (e) => {
        e.preventDefault();
        if (this.emailVisited) {
            $(e.target).parent().addClass("was-validated")
            if (e.target.value==""){
                this.setState({emailMessage:'Email is reqiured!'})
                e.target.setCustomValidity('Invalid');
            }
            else if (T.validateEmail(e.target.value)) {
                this.setState({emailMessage:null})
                e.target.setCustomValidity('');
            }
            else {
                this.setState({emailMessage:'Invalid email!'})
                e.target.setCustomValidity('Invalid');
                console.log("invalid email");
            }
        }
    }
    
    emailBlur = (e) => {
        e.preventDefault();
        this.emailVisited = true;
        this.validEmail(e)

    }

    render() {
        return (
            <div className="container col-xl-4 col-lg-5 col-md-6">
                <h1>Welcome to <br/>Linh's website</h1>
                <h2>Sign up now!</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.validEmail} onBlur={this.emailBlur} />
                    <small id="emailHelp" className="form-text text-error">We'll never share your email with anyone else.</small>
                    {this.state.emailMessage ? <small id="emailMessage" className="form-text" style={{ color: 'red' }}>{this.state.emailMessage}</small> : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username"/>
                    <small id="passwordHelpBlock" className="form-text text-muted">
                      Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"/>
                    <small id="passwordHelpBlock" className="form-text text-muted">
                      Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password"/>
                    <small id="passwordHelpBlock" className="form-text text-muted">
                      Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Your full name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your full name"/>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.signup}>Signup</button>
                </form>
                Already have an account?
                <Link to="/login"> Log in now!</Link>
            </div>
        );
    }
}

export default Signup;