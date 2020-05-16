import React, { Component } from 'react';
import Axios from 'axios';
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
            username: props.username,
            user_id: '',
            content: ''
        }
    }


    componentDidMount() {
        Axios.get('http://localhost:5000/users/' + this.state.username)
            .then(res => {                
                this.setState({
                    user_id: res.data._id
                })
            })
            .catch(err => console.log(err));
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            user_id: this.state.user_id,
            content: this.state.content
        }

        Axios.post('http://localhost:5000/posts/add', post)
            .then(res => {
                console.log(res.data);

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
                        <Card.Title>@{this.state.username}</Card.Title>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Control className="custom-textarea" as="textarea" placeholder="Write something!" value= {this.state.content} onChange={this.onChangeContent}></Form.Control>
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