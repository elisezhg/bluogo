import React, { Component } from 'react';
import Axios from 'axios';
import Post from './post.component';


export default class Trending extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/posts/trending')
        .then(res => {                
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err));
    }

    postsList() {
        return this.state.posts.map(post => {
            return <Post post={post} username={this.state.username} key={post._id}/>;
        })
    }


    render() {
        return (
            <div>
                { this.postsList() }
            </div>
        )
    }
}