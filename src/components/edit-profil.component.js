import React, { Component } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import User from './user.component';
import { BrowserRouter as Router, Route} from "react-router-dom";
import '../utils/custom.css';
const passwordHash = require('password-hash');


export default class EditProfil extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeNewPasswordConf = this.onChangeNewPasswordConf.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);

        this.state = {
            username: '',
            newUsername: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date(),
            usernameUnique: true,
            newPassword: '',
            newPasswordConf: '',
            passwordHashed: '',
            passwordMatch: true,
            newPwInvalid: false,
            newPwConfInvalid: false,
            lastNameInvalid: false,
            firstNameInvalid: false,
            usernameInvalid: false
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/users/' + this.props.match.params.username)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    newUsername: res.data.username,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    dateOfBirth: new Date(res.data.dateOfBirth),
                    bio: res.data.bio,
                    passwordHashed: res.data.password
                })
            })
    }


    onChangeDate(date) {
        this.setState({
            dateOfBirth: date
        });
    }


    onChangeUsername(e) {
        this.setState({
            newUsername: e.target.value,
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
        Axios.get('http://localhost:5000/users/')
        .then(users => {
            for (var user in users.data) {
                const username = users.data[user].username;
                if (username === this.state.newUsername && username !== this.state.username) {
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
            passwordMatch: true
        });

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        
        if (regex.test(e.target.value)) {
            this.setState({
                passwordInvalid: false
            })
        }
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value,
            newPwInvalid: true
        });

        
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        
        if (regex.test(e.target.value)) {
            this.setState({
                newPwInvalid: false
            })
        }
    }

    onChangeNewPasswordConf(e) {
        this.setState({
            newPasswordConf: e.target.value,
            newPwConfInvalid: false
        });
    }
    
    onChangeBio(e) {
        this.setState({
            bio: e.target.value
        });
    }


    // Submit form
    onSubmit(e) {
        e.preventDefault();

        if (this.state.newPassword !== this.state.newPasswordConf) {
            this.setState({
                newPwConfInvalid: true
            })
            return;
        } else if (!passwordHash.verify(this.state.password, this.state.passwordHashed)) {
            this.setState({
                passwordMatch: false
            })
            return;
        } else if (this.state.usernameUnique === false) {
            return;
        }


        //post user
        const user = {
            username: this.state.newUsername,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.passwordHashed,
            dateOfBirth: this.state.dateOfBirth,
            bio: this.state.bio
        }

        if (this.state.newPassword !== '') {
            user.password = passwordHash.generate(this.state.newPassword);
        }

        console.log(user)
        Axios.post('http://localhost:5000/users/edit/' + this.props.match.params.username, user)
            .then(res => {
                localStorage.setItem('username', this.state.newUsername);
                localStorage.setItem('firstname', this.state.firstName);
                localStorage.setItem('lastname', this.state.lastName);
                localStorage.setItem('bio', this.state.bio)
                window.location = '/profil/' + this.state.newUsername;
            })
            .catch(err => console.log(err));
    }




    render() {

        return (
            <Router>
            <Jumbotron>
                <Route path="/profil/edit/:username" exact component={User} /><br/><br/>

                <Form onSubmit={this.onSubmit}>
                <Form.Group as={Col} md="8" className="mx-auto">

                <Form.Label>Personal information</Form.Label>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control required isInvalid={this.state.firstNameInvalid} value={this.state.firstName} onChange={this.onChangeFirstName} />
                            <Form.Control.Feedback type="invalid">First name is invalid</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control required isInvalid={this.state.lastNameInvalid} value={this.state.lastName} onChange={this.onChangeLastName} />
                            <Form.Control.Feedback type="invalid">Last name is invalid</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col><DatePicker
                        required
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={this.state.date}
                        selected={this.state.dateOfBirth}
                        onChange={this.onChangeDate}
                        className="form-control"/>
                    </Col>
                </Row><br/><br/>

                <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.bio} onChange={this.onChangeBio}/>
                </Form.Group><br/>

                <Form.Label>Profil</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control required isInvalid={this.state.usernameInvalid || !this.state.usernameUnique} type="text" placeholder="Username" aria-describedby="inputGroupPrepend" value={this.state.newUsername} onChange={this.onChangeUsername}/>
                        <Form.Control.Feedback type="invalid">{this.state.usernameInvalid? "Please choose a valid username." : "Username is already taken!"}</Form.Control.Feedback>
                    </InputGroup><br/><br/>

                    <Form.Label>Change password</Form.Label>
                    <Form.Group>
                        <Form.Control isInvalid={this.state.newPwInvalid} type="password" placeholder="New password" autoComplete="on" onChange={this.onChangeNewPassword}/>
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
                        <Form.Control isInvalid={this.state.newPwConfInvalid} type="password" placeholder="Confirm new password" autoComplete="on" onChange={this.onChangeNewPasswordConf}/>
                        <Form.Control.Feedback type="invalid">Passwords don't match.</Form.Control.Feedback>
                    </Form.Group><br/>

                    <Form.Group>
                        <Form.Label>Enter your password to apply changes</Form.Label>
                        <Form.Control required isInvalid={!this.state.passwordMatch} type="password" placeholder="Password" autoComplete="on" onChange={this.onChangePassword}/>
                        <Form.Control.Feedback type="invalid">Password is incorrect.</Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-right">
                        <Button variant="primary" type="submit">Modify</Button>
                    </div>
                </Form.Group>
            </Form>
            </Jumbotron>
            </Router>
        )
    }
}