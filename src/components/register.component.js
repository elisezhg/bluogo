import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../utils/custom.css';
const passwordHash = require('password-hash');



export default class Register extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConf = this.onChangePasswordConf.bind(this);

        this.state = {
            username: '',
            password: '',
            passwordConf: '',
            firstName: '',
            lastName: '',
            date: new Date(),
            usernameUnique: true,
            firstNameInvalid: false,
            lastNameInvalid: false,
            usernameInvalid: false,
            passwordInvalid: false,
            pwConfInvalid: false,
            Auth: this.props.authApi
        }
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
            usernameUnique: true,
            usernameInvalid: false
        });


        const regex = /[^a-zA-Z0-9._-]/;

        if (regex.test(e.target.value)) {
            this.setState({
                usernameInvalid: true
            })
        }


        // Username already taken?
        axios.get('http://localhost:5000/users/usernames')
        .then(users => {
            for (var user in users.data) {
                const username = users.data[user].username;
                if (username === this.state.username) {
                    this.setState({
                        usernameUnique: false
                    })
                    return;
                }
            }
        })
        .catch(err => console.log(err));
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value,
            firstNameInvalid: false
        });

        const regex = /[^a-zA-Z]/;
        
        if (regex.test(e.target.value)) {
            this.setState({
                firstNameInvalid: true
            })
        }
    }


    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value,
            lastNameInvalid: false
        });

        const regex = /[^a-zA-Z]/;
        
        if (regex.test(e.target.value)) {
            this.setState({
                lastNameInvalid: true
            })
        }
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            passwordInvalid: true
        });

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        
        if (regex.test(e.target.value)) {
            this.setState({
                passwordInvalid: false
            })
        }
    }

    onChangePasswordConf(e) {
        this.setState({
            passwordConf: e.target.value,
            pwConfInvalid: false
        });
    }


    // Submit form
    onSubmit(e) {
        e.preventDefault();

        if (this.state.password !== this.state.passwordConf) {
            console.log("password does not match");
            this.setState({
                pwConfInvalid: true
            })
            return;
        } else if (this.state.usernameUnique === false) {
            console.log("username is already taken");
            return;
        }

        //post user
        const user = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: passwordHash.generate(this.state.password),   // hash password
            dateOfBirth: this.state.date
        }

        axios.post('http://localhost:5000/users/add', user)
            .then(res => {
                this.state.Auth.setAuth(true);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', this.state.username);
                localStorage.setItem('firstname', this.state.firstName);
                localStorage.setItem('lastname', this.state.lastName);
                localStorage.setItem('id', res.data.id);
                window.location = '/profil/' + this.state.username;
            })
            .catch(err => console.log(err));
    }




    render() {

        return (
            <Jumbotron>
                <Form onSubmit={this.onSubmit}>
                <Form.Group as={Col} md="8" className="mx-auto">

                <h1>Register</h1><br/>

                <Row>
                    <Col>
                        <Form.Label>Name</Form.Label>
                        <Form.Group>
                            <Form.Control required isInvalid={this.state.firstNameInvalid} placeholder="First name" onChange={this.onChangeFirstName} />
                            <Form.Control.Feedback type="invalid">First name is invalid</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control required isInvalid={this.state.lastNameInvalid} placeholder="Last name" onChange={this.onChangeLastName} />
                            <Form.Control.Feedback type="invalid">Last name is invalid</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Date of Birth </Form.Label>
                        <Form.Group>
                        <DatePicker
                            required
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            maxDate={this.state.date}
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            className="form-control"/>
                        </Form.Group><br/>
                    </Col>
                </Row><br/>

                <hr/><Form.Label>Profil</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control required isInvalid={this.state.usernameInvalid || !this.state.usernameUnique} type="text" placeholder="Username" aria-describedby="inputGroupPrepend" value={this.state.username} onChange={this.onChangeUsername}/>
                        <Form.Control.Feedback type="invalid">{this.state.usernameInvalid? "Please choose a valid username." : "Username is already taken!"}</Form.Control.Feedback>
                    </InputGroup><br/>

                    <Form.Group>
                        <Form.Control required isInvalid={this.state.passwordInvalid} type="password" placeholder="Password" autoComplete="on" onChange={this.onChangePassword}/>
                        <Form.Control.Feedback type="invalid">
                            Password must be 6 characters or longer and must contain at least :
                            <ul>
                                <li>1 lowercase</li>
                                <li>1 uppercase</li>
                                <li>1 digit</li>
                            </ul>
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control required isInvalid={this.state.pwConfInvalid} type="password" placeholder="Confirm password" autoComplete="on" onChange={this.onChangePasswordConf}/>
                        <Form.Control.Feedback type="invalid">Passwords don't match.</Form.Control.Feedback>
                    </Form.Group><br/>

                    <div className="text-center">
                        <Button variant="primary" type="submit">Sign Up</Button>
                        <Link to="/login" type="button" className="btn btn-link">Login</Link>
                    </div>
                </Form.Group>
            </Form>
            </Jumbotron>
        )
    }
}