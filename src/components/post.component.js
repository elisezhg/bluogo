import React, { Component } from 'react';
import axios from 'axios';
import autosize from 'autosize';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Comment from './comment.component';
import AddComment from './add-comment.component';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

export default class Post extends Component {

    constructor(props) {
        super(props);

        this.onLike = this.onLike.bind(this);
        this.toggleComments = this.toggleComments.bind(this);
        this.commentsList = this.commentsList.bind(this);
        this.setRefresh = this.setRefresh.bind(this);
        this.showPostSettings = this.showPostSettings.bind(this);
        this.editPost = this.editPost.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deletePost = this.deletePost.bind(this);

        this.state = {
            post: props.post,
            comments: props.post.comments,
            date: (new Date(props.post.createdAt)).toLocaleDateString(),
            time: (new Date(props.post.createdAt)).toLocaleTimeString(),
            likes: props.post.likes,
            liked: false,
            showComments: false,
            user_id: '',
            needRefresh: false
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/users/id/' + this.state.post.user_id)
            .then(res => {           
                this.setState({
                    username: res.data,
                    content: this.state.post.content,
                    isMounted: true
                })
            })
            .catch(err => console.log(err));

        if (!localStorage.getItem('token')) return;
        axios.get('http://localhost:5000/users/token/' + localStorage.getItem('token'))
            .then(res => {
                this.setState({
                    user_id: res.data._id,
                    liked: this.state.likes.includes(res.data._id) ? true : false
                })
            })

        
    }


    // Update the post if a new comment is added
    componentDidUpdate() {
        if (this.state.needRefresh) {
            console.log(this.state.needRefresh)
            axios.get('http://localhost:5000/posts/comments/' + this.state.post._id + '/' + localStorage.getItem('token'))
            .then(res => {   
                console.log(res)
                this.setState({
                    comments: res.data,
                    needRefresh: false
                })
            })
            .catch(err => console.log(err));
        }
    }


    onLike(e) {
        if (!localStorage.getItem('token')) {
            window.location = '/login';
            return;
        }

        if(!this.state.liked) {
            this.setState({
                likes: this.state.post.likes.push(this.state.user_id)
            })
        } else {
            const index = this.state.post.likes.indexOf(this.state.user_id);
            this.setState({
                likes: this.state.post.likes.splice(index,1)
            })
        }

        this.setState({
            liked: !(this.state.liked)
        })

        const action = this.state.liked ?  'unlike/' : 'like/' 

        axios.post('http://localhost:5000/posts/' + action + this.state.post._id, {user_id : this.state.user_id})
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }


    toggleComments(e) {
        this.setState({
            showComments: !this.state.showComments
        })
    }


    commentsList() {
        return this.state.comments.map(comment => {
            return <Comment comment={comment} username={this.state.username} key={comment._id}/>;
        })
    }


    setRefresh() {
        this.setState({
            needRefresh: true
        })
    }


    editPost() {
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

        const updatedPost = {
            content: this.state.content,
            token: localStorage.getItem('token')
        }

        axios.post('http://localhost:5000/posts/update/' + this.state.post._id, updatedPost)
            .then(res => {
                this.setState({
                    edit: false
                })
            })
            .catch(err => console.log(err));
    }


    deletePost(e) {
        axios.delete('http://localhost:5000/posts/' + this.state.post._id + '/' + localStorage.getItem('token'))
            .then(() => {
                this.setState({
                    deleted: true
                })
            })
            .catch(err => console.log(err));
    }


    showPostSettings() {
        if (!this.state.isMounted) return;
        if (localStorage.getItem('username') !== this.state.username) return;
    
        return (
            <Dropdown>
                <Dropdown.Toggle as='div' className="float-right" variant="success" id="dropdown-basic" >
                <i className="fas fa-ellipsis-v" style={{ fontSize: '0.85em', margin: '0', color: 'lightgray' }}/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => this.setState({ edit: true})}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={this.deletePost}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }


    render() {

        const heartFill = (<svg className="bi bi-heart-fill text-danger" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clipRule="evenodd"/>
        </svg>);

        const heart = (<svg className="bi bi-heart text-danger" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clipRule="evenodd"/>
        </svg>);

        const chatFill = (<svg className="bi bi-chat-dots-fill text-info" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
        </svg>);

        const chat = (<svg className="bi bi-chat-dots text-info" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" clipRule="evenodd"/>
            <path d="M5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/>
        </svg>);

        return (
            <> {this.state.deleted? <></> :
            <div><br/><br/>
                <Card>
                    <Card.Body>
                        {this.showPostSettings()}
                    <ReactPlaceholder type='text' ready={this.state.username} color='#E0E0E0' rows={1} style={{ width: 100 }} showLoadingAnimation={true}>
                        <Card.Title>
                            <a href={'/profil/' + this.state.username}>@{this.state.username}</a>
                        </Card.Title>
                    </ReactPlaceholder><br/>
                    
                    <ReactPlaceholder type='text' ready={this.state.content} color='#E0E0E0' rows={4} showLoadingAnimation={true} firstLaunchOnly={true}>
                        {this.state.edit ? this.editPost() :
                        <Card.Text className="container" style={{whiteSpace: 'pre-wrap'}}>{this.state.content}</Card.Text>}
                    </ReactPlaceholder><br/>

                        
                    <div>
                        <div className="float-right text-muted">
                            {this.state.post.createdAt.substring(11,16) + " " + this.state.post.createdAt.substring(0,10)}
                        </div>

                        {" " + this.state.post.likes.length + " "}
                        <span onClick={this.onLike}>
                            {this.state.liked? heartFill : heart}
                        </span>&nbsp;&nbsp;

                        {" " + this.state.comments.length + " "}
                        <span onClick={this.toggleComments}>
                            {this.state.showComments? chatFill : chat}
                        </span>

                        {this.state.showComments ? (<>{ this.commentsList() }{localStorage.getItem('token') ? (<AddComment post={this.state.post} setRefresh={this.setRefresh}/>) : (<></>)}</>) : (<></>)}
                    </div>
                    </Card.Body>
                </Card>
            </div>
            }</>
        )
    }
}