import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: props.comment,
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
                showUsername: true
            })
        })
        .catch(err => console.log(err));
    }


    render() {
        return (
            <div><br/>
            <Card bg="light" className="card-comment">
                <Card.Body>
                    
                    <ReactPlaceholder type='text' ready={this.state.showUsername} color='#E0E0E0' rows={1} style={{ width: 100 }} showLoadingAnimation={true}>
                        <Card.Title>
                            <a href={'/profil/' + this.state.username}>@{this.state.username}</a>
                        </Card.Title>
                    </ReactPlaceholder><br/>

                    <Card.Text className="container" style={{whiteSpace: 'pre-wrap'}}>
                        {this.state.comment.content}
                    </Card.Text>
                        <div className="float-right text-muted small ">
                            {this.state.time.substring(0,5) + " " + this.state.date}
                        </div>
                </Card.Body>
            </Card>
        </div>
        )
    }
}