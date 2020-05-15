import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
const passwordHash = require('password-hash');

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        console.log(this.props.authApi)

        this.state = {
            username: '',
            password: '',
            usernameExist: false,
            usernameInvalid: false,
            passwordInvalid: false,
            Auth: this.props.authApi
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
            usernameExist: false,
            usernameInvalid: false
        })

        // Username already taken?
        Axios.get('http://localhost:5000/users/usernames')
        .then(users => {
            for (var user in users.data) {
                const username = users.data[user].username;
                if (username === this.state.username) {
                    this.setState({
                        usernameExist: true
                    })
                    return;
                }
            }
        })
        .catch(err => console.log(err));
    }


    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            passwordInvalid: false
        })
    }


    // Submit form
    onSubmit(e) {
        e.preventDefault();

        if (this.state.usernameExist === false) {
            this.setState({
                usernameInvalid: true
            })
            return;
        }


        const pw = this.state.password;

        Axios.get('http://localhost:5000/users/password/' + this.state.username)
            .then(res => {
                if (passwordHash.verify(pw, res.data)) {
                    this.state.Auth.setAuth(true);
                    localStorage.setItem('logged in', 'true');
                    localStorage.setItem('username', this.state.username);
                    window.location = '/';
                } else {
                    this.setState({ passwordInvalid: true })
                }
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <Jumbotron >
                <Form onSubmit={this.onSubmit}>
                <Form.Group as={Col} md="5" className="mx-auto">
                    <h1>Login</h1><br/>
                    <Form.Label>Username</Form.Label>
                    <Form.Control isInvalid={this.state.usernameInvalid} type="text" placeholder="Enter username" onChange={this.onChangeUsername}/>
                    <Form.Control.Feedback type="invalid">Username does not exist</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="5" className="mx-auto">
                    <Form.Label>Password</Form.Label>
                    <Form.Control isInvalid={this.state.passwordInvalid && !this.state.usernameInvalid} type="password" placeholder="Password" autoComplete="on" onChange={this.onChangePassword}/>
                    <Form.Control.Feedback type="invalid">Wrong password!</Form.Control.Feedback>
                </Form.Group><br/><br/>

                <div className="text-center">
                    <Button variant="primary" type="submit">Sign In</Button>
                    <Link to="/register" type="button" className="btn btn-link">Register</Link>
                </div>
            </Form></Jumbotron>
        )
    }
}
