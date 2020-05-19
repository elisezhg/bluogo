import React, { Component } from 'react';
import axios from 'axios';
import autosize from 'autosize';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
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
        axios.get('http://localhost:5000/users/url/' + localStorage.getItem('id'))
            .then(res => {
                this.setState({
                    url: res.data
                })
            })
            .catch(err => console.log(err))
    }

    onChangeContent(e) {
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
                    <ReactPlaceholder
                        type='round'
                        ready={this.state.url}
                        color='#E0E0E0'
                        style={{ width: 60, height: 60, marginRight: '20px', float: 'left' }}
                        showLoadingAnimation={true}
                    >
                        <a href={'/profil/' + this.state.username}>
                        <Image
                            src={this.state.url}
                            roundedCircle
                            style={{ width: 60, height: 60, marginRight: '20px', float: 'left' }}
                        />
                        </a>
                    </ReactPlaceholder>

                    <Card.Title>
                        <a href={'/profil/' + this.state.username} style={{ fontSize: '0.9em' }}>
                            Elise Zheng <br/>
                            @{this.state.username}
                        </a><br/>
                    </Card.Title><br/>

                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <textarea style={{ fontSize: '1.1em' }} className="custom-textarea container" placeholder="Write something!" value= {this.state.content} onChange={this.onChangeContent}></textarea>
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