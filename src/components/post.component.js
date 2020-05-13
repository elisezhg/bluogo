import React, { Component } from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';


export default class Post extends Component {

    constructor(props) {
        super(props);

        this.onLike = this.onLike.bind(this);

        this.state = {
            post: props.post,
            username: props.username,
            liked: false
        }
    }

    onLike(e) {
        this.setState({
            liked: !(this.state.liked)
        })
    }

    render() {
        return (
            <div className=""><br/>
                <Card style={{ width: '70%', margin: 'auto' }}>
                    <Card.Header as="h5">@{this.state.username}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {this.state.post.content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        {this.state.post.like.length + " "}
                        <svg onClick={this.onLike} className={this.state.liked ? "bi bi-heart-fill" : "bi bi-heart"} width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d={this.state.liked ?"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z":"M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"} clipRule="evenodd"/>
                        </svg>
                        {"  0  "}
                        <svg class="bi bi-chat-dots" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" clip-rule="evenodd"/>
                        <path d="M5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                        </svg>
                        <div className="float-right">
                            {this.state.post.createdAt.substring(0,10)}
                        </div>
                    </Card.Footer>
                </Card>
            </div>)
    }

}