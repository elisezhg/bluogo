import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }


    // Submit form
    onSubmit(e) {
        e.preventDefault();

        //hashage pw
        //cherche pw dans user avc mm username
        //check si pareil

        //const pw = this.state.password;
        //console.log("test")

        Axios.get('http://localhost:5000/users/password/' + this.state.username)
            .then(res => {
                if (this.state.password === res.data) {
                    console.log('correct');
                    window.location = '/';
                } else {
                    console.log("incorrect password");
                }
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <Jumbotron >
                <Form onSubmit={this.onSubmit}>
                <Form.Group as={Col} md="5" controlId="formSignIn" className="mx-auto">
                    <h1>Login</h1><br/>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={this.onChangeUsername}/>

                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" autoComplete="on" onChange={this.onChangePassword}/>
                </Form.Group><br/><br/>

                <div className="text-center">
                    <Button variant="primary" type="submit">Sign In</Button>
                    <Link to="/register" type="button" className="btn btn-link">Register</Link>
                </div>
            </Form></Jumbotron>
        )
    }
}
