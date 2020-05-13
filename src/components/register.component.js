import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



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
            firstname: '',
            lastname: '',
            date: new Date()
        }
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });

        //username already taken?
        Axios.get('http://localhost:5000/users/')
        .then(users => {
            users.data.foreach(user => {
                if (user.username === this.state.username) {
                    console.log("username is already taken");
                    return;
                }
            })
        })
        .catch(err => console.log(err));
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }


    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangePasswordConf(e) {
        this.setState({
            passwordConf: e.target.value
        });
    }


    // Submit form
    onSubmit(e) {
        e.preventDefault();

        if (this.state.password !== this.state.passwordConf) {
            console.log("password does not match");
        } else {
            console.log("pw matches");
        }


        //post user
        const user = {
            username: this.state.username,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            password: this.state.password,
            dateOfBirth: this.state.date
        }

        Axios.post('http://localhost:5000/users/add', user)
            .then(res => {
                console.log(res.data);
                window.location = '/';
            })
            .catch(err => console.log(err));
    }




    render() {

        return (
            <Jumbotron>
                <Form onSubmit={this.onSubmit}>
                <Form.Group as={Col} md="8" className="mx-auto">

                <h1>Register</h1><br/>

                <Form.Label>Personal information</Form.Label>
                <Row>
                    <Col><Form.Control required placeholder="First name" onChange={this.onChangeFirstName} /></Col>
                    <Col><Form.Control required placeholder="Last name" onChange={this.onChangeLastName} /></Col>
                    <Col><DatePicker 
                        required
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={this.state.date}
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        className="form-control"/>
                    </Col>
                </Row><br/>

                <hr/><Form.Label>Profil</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control required type="text" placeholder="Username" aria-describedby="inputGroupPrepend" value={this.state.username} onChange={this.onChangeUsername}/>

                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </InputGroup><br/>

                    <Form.Group>
                        <Form.Control required type="password" placeholder="Password" autoComplete="on" onChange={this.onChangePassword}/><br/>
                        <Form.Control required type="password" placeholder="Password confirmation" autoComplete="on" onChange={this.onChangePasswordConf}/>
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