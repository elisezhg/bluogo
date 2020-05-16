import React, { Component } from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            comment: props.comment
        }
    }


    componentDidMount() {
        Axios.get('http://localhost:5000/users/id/' + this.state.comment.user_id)
        .then(res => {
            this.setState({
                username: res.data.username
            })
        })
        .catch(err => console.log(err));
    }


    render() {
        return (
            <div><br/>
            <Card bg="light" className="card-comment">
                <Card.Body>
                    <Card.Title>@{this.state.username}</Card.Title>
                    <Card.Text className="container">
                        {this.state.comment.content}
                    </Card.Text>
                        <div className="float-right">
                            {this.state.comment.createdAt.substring(11,16) + " " + this.state.comment.createdAt.substring(0,10)}
                        </div>
                </Card.Body>
            </Card>
        </div>
        )
    }
}