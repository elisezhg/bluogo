import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.calculateAge = this.calculateAge.bind(this);

        this.state = {
            username: props.match.params.username
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
                    age: this.calculateAge(new Date(res.data.dateOfBirth)),
                    id: res.data._id
                })

                axios.get('http://localhost:5000/users/url/' + this.state.id)
                .then(res => {
                    this.setState({
                        url: res.data
                    })
                })
                .catch(err => console.log(err))

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
                <ReactPlaceholder
                    type='round'
                    ready={this.state.url}
                    color='#E0E0E0'
                    style={{ width: 100, height: 100, margin: 'auto' }}
                    showLoadingAnimation={true}
                >
                    <Image
                        src={this.state.url}
                        roundedCircle
                        style={{ width: 100, height: 100, margin: 'auto' }}
                    />
                </ReactPlaceholder><br/>
                
                <h1 className="display-4">
                    {this.state.firstName} {this.state.lastName} |&nbsp;
                    <small className="text-muted">{this.state.age}</small>
                </h1>
                <h2>@{this.state.username}</h2><hr className="my-4"/>
                <p className="lead"><i>{this.state.bio}</i></p>
            </Container>
        )
    }
}