import React, { Component } from 'react';
import axios from 'axios';
import autosize from 'autosize';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.showCommentSettings = this.showCommentSettings.bind(this);
        this.editComment = this.editComment.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteComment = this.deleteComment.bind(this);

        this.state = {
            comment: props.comment,
            content: props.comment.content,
            date: (new Date(props.comment.createdAt)).toLocaleDateString(),
            time: (new Date(props.comment.createdAt)).toLocaleTimeString(),
            username: props.username
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/users/id/' + this.state.comment.user_id)
        .then(res => {
            this.setState({
                username: res.data,
                showUsername: true,
                isMounted: true
            })
        })
        .catch(err => console.log(err));
    }
    

    editComment() {
        return (
            <Form onSubmit={this.onSubmit}>
                <textarea
                    className="custom-textarea container"
                    value= {this.state.content} 
                    onChange={this.onChangeContent}>
                </textarea>
                <div className="text-right">
                    <Button variant="outline-dark" type="submit">Edit</Button>
                </div>
            </Form>
        )
    }


    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });

        autosize(document.querySelectorAll('textarea'));
    }


    onSubmit(e) {
        e.preventDefault();

        const updatedComment = {
            content: this.state.content,
            token: localStorage.getItem('token')
        }

        axios.post('http://localhost:5000/posts/comments/update/' + this.state.comment._id, updatedComment)
            .then(res => {
                this.setState({
                    edit: false
                })
            })
            .catch(err => console.log(err));
    }


    deleteComment(e) {
        axios.delete('http://localhost:5000/posts/comments/' + this.state.comment._id + '/' + localStorage.getItem('token'))
            .then(() => {
                this.setState({
                    deleted: true
                })
            })
            .catch(err => console.log(err));
    }


    showCommentSettings() {
        if (!this.state.isMounted) return;
        if (localStorage.getItem('username') !== this.state.username) return;
    
        return (
            <Dropdown>
                <Dropdown.Toggle as='div' className="float-right" variant="success" id="dropdown-basic" >
                <i className="fas fa-ellipsis-v" style={{ fontSize: '0.85em', margin: '0', color: 'lightgray' }}/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.setState({ edit: true})}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={this.deleteComment}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }


    render() {
        return (
            <> {this.state.deleted? <></> :
            <div><br/>
            <Card bg="light" className="card-comment">
                <Card.Body>
                    {this.showCommentSettings()}
                    <ReactPlaceholder type='text' ready={this.state.showUsername} color='#E0E0E0' rows={1} style={{ width: 100 }} showLoadingAnimation={true}>
                        <Card.Title>
                            <a href={'/profil/' + this.state.username}>@{this.state.username}</a>
                        </Card.Title>
                    </ReactPlaceholder><br/>
                    
                    {this.state.edit ?
                        this.editComment() :
                        <Card.Text className="container" style={{whiteSpace: 'pre-wrap'}}>
                            {this.state.content}
                        </Card.Text>}

                    <div className="float-right text-muted small ">
                        {this.state.time.substring(0,5) + " " + this.state.date}
                    </div>
                </Card.Body>
            </Card>
        </div>
        }</>
        )
    }
}