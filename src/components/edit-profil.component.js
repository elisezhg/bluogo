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



export default class EditProfil extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConf = this.onChangePasswordConf.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);

        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date()
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/users/' + this.props.match.params.username)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    dateOfBirth: new Date(res.data.dateOfBirth),
                    bio: res.data.bio
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
            firstName: e.target.value
        });
    }


    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
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

    
    onChangeBio(e) {
        this.setState({
            bio: e.target.value
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            dateOfBirth: this.state.dateOfBirth,
            bio: this.state.bio
        }

        console.log(user)
        Axios.post('http://localhost:5000/users/edit/' + this.props.match.params.username, user)
            .then(res => {
                console.log(res.data);
                window.location = '/profil/' + this.state.username;
            })
            .catch(err => console.log(err));
    }




    render() {

        return (
            <Router>
            <Jumbotron>
                <Route path="/profil/edit/:username" exact component={User} />

                <Form onSubmit={this.onSubmit}>
                <Form.Group as={Col} md="8" className="mx-auto">

                <Form.Label>Personal information</Form.Label>
                <Row>
                    <Col><Form.Control required type="text" value={this.state.firstName} onChange={this.onChangeFirstName} /></Col>
                    <Col><Form.Control required type="text" value={this.state.lastName} onChange={this.onChangeLastName}/></Col>
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
                </Row><br/>

                <hr/><Form.Label>Profil</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control required type="text" aria-describedby="inputGroupPrepend" value={this.state.username} onChange={this.onChangeUsername}/>

                    </InputGroup><br/>

                    <Form.Group>
                        <Form.Control required type="password" placeholder="Password" autoComplete="on" onChange={this.onChangePassword}/><br/>
                    </Form.Group><br/>


                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.bio} onChange={this.onChangeBio}/>
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