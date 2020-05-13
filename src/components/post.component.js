import React, { Component } from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


export default class EditProfil extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            posts: []
        }
    }


    onChangeContent(e) {
        this.setState = {
            content: e.target.value
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            user_id: this.state.username,
            content: this.state.content,
            like: []
        }

        Axios.post('http://localhost:5000/posts/add', post)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }


    render() {
        return (
            <div></div>
        )
    }
}