import React, { Component } from 'react';
import axios from 'axios';
import Post from './post.component';
import SideProfil from './side-profil.component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Trending extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/posts/trending')
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
            <Container>
                <Row style={{flexWrap: 'wrap-reverse'}}>
                    <Col>{ this.postsList() }</Col>
                    <Col lg="4">
                        <SideProfil/>
                    </Col>
                </Row>
            </Container>
        )
    }
}