import React, { Component } from 'react';
import axios from 'axios';
import autosize from 'autosize';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);

        this.state = {
            username: localStorage.getItem('username'),
            content: '',
            post_id: props.post._id
        }
    }

    componentDidMount() {
        // axios.get('http://localhost:5000/users/token/' + localStorage.getItem('token'))
        //     .then(res => {
        //         this.setState({
        //             username: res.data.username
        //         })
        //     })
    }


    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });

        autosize(document.querySelectorAll('textarea'));
    }


    onSubmit(e) {
        e.preventDefault();

        const comment = {
            content: this.state.content,
            token: localStorage.getItem('token')
        }

        axios.post('http://localhost:5000/posts/add_comment/' + this.state.post_id, comment)
            .then(res => {
                this.props.setRefresh()
                this.setState({ content: '' });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div><br/>
            <Card bg="white" className="card-comment">
                <Card.Body>
                    <Card.Title>@{this.state.username}</Card.Title><br/>
                    <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <textarea className="custom-textarea container"placeholder="Share your thoughts!" value= {this.state.content} onChange={this.onChangeContent}></textarea>
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