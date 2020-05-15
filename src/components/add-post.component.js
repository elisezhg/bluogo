import React, { Component } from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import '../utils/custom.css';

export default class EditProfil extends Component {
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
            content: this.state.content,
            like: []
        }

        console.log(this.state.user_id)

        Axios.post('http://localhost:5000/posts/add', post)
            .then(res => {
                console.log(res.data);

                this.setState({
                    content: ''
                })
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
                <Card as={Col} md="" bg="white" key="1" text="dark" style={{ width: '70%', margin: 'auto' }}>
                    <Card.Body>
                        <Card.Title>@{this.state.username}</Card.Title>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Control className="custom-textarea" as="textarea" text="white" rows="3" placeholder="Write something!" value= {this.state.content} onChange={this.onChangeContent}></Form.Control>
                            </Form.Group>
                            
                            <div className="text-right">
                                <Button variant="primary" type="submit">Post</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>

        )
    }
}