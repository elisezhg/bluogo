import React, { Component } from 'react';
import axios from 'axios';
import autosize from 'autosize';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../utils/custom.css';

export default class AddPost extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);

        this.state = {
            username: localStorage.getItem('username'),
            content: ''
        }
        autosize(document.querySelectorAll('textarea'));
    }


    componentDidMount() {
        // axios.get('http://localhost:5000/users/' + this.state.username)
        //     .then(res => {                
        //         this.setState({
        //             user_id: res.data._id
        //         })
        //     })
        //     .catch(err => console.log(err));
    }

    onChangeContent(e) {
        autosize(document.querySelectorAll('textarea'));
        this.setState({
            content: e.target.value
        });

        autosize(document.querySelectorAll('textarea'));
    }


    onSubmit(e) {
        e.preventDefault();

        const post = {
            content: this.state.content,
            token: localStorage.getItem('token')
        }

        axios.post('http://localhost:5000/posts/add', post)
            .then(res => {
                this.setState({
                    content: ''
                })

                this.props.setRefresh(true);
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
                <Card bg="white" text="dark">
                    <Card.Body>
                        <Card.Title>@{this.state.username}</Card.Title><br/>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <textarea className="custom-textarea container" placeholder="Write something!" value= {this.state.content} onChange={this.onChangeContent}></textarea>
                            </Form.Group>
                            
                            <div className="text-right">
                                <Button variant="outline-dark" type="submit">Post</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
        )
    }
}