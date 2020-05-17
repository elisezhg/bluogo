import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

export default class User extends Component {
    constructor(props) {
        super(props);

        this.calculateAge = this.calculateAge.bind(this);

        this.state = {
            username: props.match.params.username,
            firstName: localStorage.getItem('firstname'),
            lastName: localStorage.getItem('lastname'),
            dateOfBirth: localStorage.getItem('dob') ? new Date(localStorage.getItem('dob')) : new Date(),
            bio: localStorage.getItem('bio'),
            age: localStorage.getItem('age')
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/' + this.state.username)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    dateOfBirth: new Date(res.data.dateOfBirth),
                    bio: res.data.bio,
                    age: this.calculateAge(new Date(res.data.dateOfBirth))
                })

                localStorage.setItem("firstname", res.data.firstName);
                localStorage.setItem("lastname", res.data.lastName);
                localStorage.setItem("bio", res.data.bio);
                localStorage.setItem("age", this.state.age);
            })
            .catch(err => window.location = "/");
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