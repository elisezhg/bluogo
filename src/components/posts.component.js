import React, { Component } from 'react';
import axios from 'axios';
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
        axios.get('http://localhost:5000/users/' + this.state.username)
        .then(res => {                
            this.setState({
                user_id: res.data._id
            })

            axios.get('http://localhost:5000/posts/' + this.state.user_id)
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
        })
        .catch(err => console.log(err));
    }


    componentDidUpdate(prevProps, prevState) {
        // console.log(prevState)
        if (this.props.needRefresh) {

            axios.get('http://localhost:5000/users/' + this.state.username)
            .then(res => {   
                this.setState({
                    user_id: res.data._id
                })
    
                axios.get('http://localhost:5000/posts/' + this.state.user_id)
                .then(res => {

                    this.setState({
                        posts: res.data
                    })
                    this.props.setRefresh(false);
                })
            })
            .catch(err => console.log(err));
        }
    }


    postsList() {
        localStorage.setItem('posts', JSON.stringify(this.state.posts));
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