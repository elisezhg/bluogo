import React, { Component } from 'react';
import Axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default class User extends Component {
    constructor(props) {
        super(props);

        this.calculateAge = this.calculateAge.bind(this);

        this.state = {
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: new Date(),
            bio: 'Nothing interesting',
            age: 0
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
                    bio: res.data.bio,
                    age: this.calculateAge(new Date(res.data.dateOfBirth))
                })
            })
    }


    calculateAge(dateOfBirth) {
        const difference = Date.now() - dateOfBirth;
        const age = new Date(difference);
        return Math.abs(age.getUTCFullYear() - 1970);
    }

    render() {
        return (
                <Container className="text-center">
                    <h1 className="display-4">{this.state.firstName} {this.state.lastName} | <small className="text-muted">{this.state.age}</small></h1>
                    <h2>@{this.state.username}</h2><hr className="my-4"/>
                    <p className="lead"><i>{this.state.bio}</i></p>
                </Container>
        )
    }
}