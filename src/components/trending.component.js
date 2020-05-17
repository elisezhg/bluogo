import React, { Component } from 'react';
import axios from 'axios';
import Post from './post.component';
import SideProfil from './side-profil.component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InfiniteScroll from 'react-infinite-scroller';

export default class Trending extends Component {
    constructor(props) {
        super(props);

        this.fetchMorePosts = this.fetchMorePosts.bind(this);

        this.state = {
            posts: [],
            hasMore: true
        }
    }


    fetchMorePosts() {
        axios.get('http://localhost:5000/posts/trending/' + this.state.posts.length)
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
            <Container>
                <Row style={{flexWrap: 'wrap-reverse'}}>
                    <Col>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.fetchMorePosts}
                            hasMore={this.state.hasMore}
                            initialLoad={true}
                        >
                        {this.state.posts.map((post, index) => (
                            <Post post={post} username={this.state.username} key={index}/>
                        ))}
                        </InfiniteScroll>
                    </Col>
                    <Col lg="4">
                        {localStorage.getItem('token') ? (<SideProfil/>) : (<></>)}
                    </Col>
                </Row>
            </Container>
        )
    }
}