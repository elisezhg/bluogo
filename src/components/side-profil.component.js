import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default class Sidebar extends Component {
 
    constructor(props) {
        super(props);


        this.state = {
            username: localStorage.getItem('username'),
            firstName: localStorage.getItem('firstname'),
            lastName: localStorage.getItem('lastname'),
            bio: localStorage.getItem('bio')
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/users/token/' + localStorage.getItem('token'))
            .then(res => {
                this.setState({
                    username: res.data.username,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    bio: res.data.bio
                })
            })
    }

  
    render () {
      return (
          <div className="sticky-profil"><br/>
                <Card>
                    <Card.Body>
                    <Card.Title>@{this.state.username}</Card.Title><br/>
                        <Card.Text className="container">
                            {this.state.bio}
                        </Card.Text><br/>
                    
                    <div>
                        <div className="float-right text-muted">
                        </div>
                    </div>
                    </Card.Body>
                </Card>        
          </div>

      );
    }
}