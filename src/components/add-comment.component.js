import React, { Component } from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);

        this.state = {
            user_id: props.post.user_id,
            username: props.username,
            content: '',
            post_id: props.post._id
        }
    }


    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const comment = {
            content: this.state.content,
            user_id: this.state.user_id,
            createdAt: new Date()
        }

        Axios.post('http://localhost:5000/posts/add_comment/' + this.state.post_id, comment)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div><br/>
            <Card bg="white" className="card-comment">
                <Card.Body>
                    <Card.Title>@{this.state.username}</Card.Title>
                    <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Control className="custom-textarea" as="textarea" text="white" rows="1" placeholder="Share your thoughts!" value= {this.state.content} onChange={this.onChangeContent}></Form.Control>
                            </Form.Group>
                            
                            <div className="text-right">
                                <Button variant="outline-dark" type="submit">Post</Button>
                            </div>
                        </Form>
                </Card.Body>
            </Card>
            </div>
        )
    }
}