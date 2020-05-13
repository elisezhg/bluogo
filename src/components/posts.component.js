import React, { Component } from 'react';
import Axios from 'axios';
import Post from './post.component';


export default class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            username: props.username,
            posts: []
        }
    }


    componentDidMount() {
        Axios.get('http://localhost:5000/users/' + this.state.username)
        .then(res => {                
            this.setState({
                user_id: res.data._id
            })

            Axios.get('http://localhost:5000/posts/' + this.state.user_id)
            .then(res => {
                console.log(res)
                this.setState({
                    posts: res.data
                })
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