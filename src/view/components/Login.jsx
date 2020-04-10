import React from 'react';
import T from '../js/common';
import { Link } from 'react-router-dom'
const $ = window.$;
class Login extends React.Component {
    state = { apiMessage: null }

    componentDidMount() {
        
    }
    login = (e) => {
        e.preventDefault();
        let data = {
            email: $("#email").val(),
            password: $("#password").val()
        }
        console.log('hihihihi:');
        T.post("/login", data,
        data => this.setState({data}),
        error => this.setState({ apiMessage: "API connect fail" }));
        console.log('hihihihi:');
    }
    render() {
        return (
            <div className="container col-xl-4 col-lg-5 col-md-6">
                <h1>Welcome to <br/>Linh's website</h1>
                <h2>Log in now!</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"/>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.login}>Submit</button>
                </form>
                Don't have an account?
                <Link to="/signup" > Sign up now!</Link>
            </div>
        );
    }
}

export default Login;