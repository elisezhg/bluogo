import React, { Component } from 'react';
import axios from 'axios';
import Post from './post.component';
import InfiniteScroll from 'react-infinite-scroller';

export default class Posts extends Component {
    constructor(props) {
        super(props);

        this.fetchMorePosts = this.fetchMorePosts.bind(this);

        this.state = {
            user_id: '',
            username: props.username,
            posts: [],
            hasMore: true
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/users/' + this.state.username)
        .then(res => {                
            this.setState({
                user_id: res.data._id
            })
        })
        .catch(err => console.log(err));
    }


    componentDidUpdate() {
        if (this.props.needRefresh) {
            
            axios.get('http://localhost:5000/posts/newpost/' + this.state.user_id)
                .then(res => {
                    this.setState({
                        posts: [res.data].concat(this.state.posts),
                    })
                    this.props.setRefresh(false);
                })
                .catch(err => console.log(err));
        }
    }


    fetchMorePosts() {
        if (this.state.user_id === '') return; // not mounted yet
    
        axios.get('http://localhost:5000/posts/' + this.state.user_id + '/' + this.state.posts.length)
            .then(res => {
                if (res.data === 'end') {
                    this.setState({ hasMore: false });
                    return;
                }

                this.setState({
                    posts: this.state.posts.concat(res.data)
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.fetchMorePosts}
                    hasMore={this.state.hasMore}
                    initialLoad={true}
                >
                    {this.state.posts.map(post => (
                        <Post post={post} username={this.state.username} key={post._id}/>
                    ))}
                </InfiniteScroll>
            </>
        )
    }
}