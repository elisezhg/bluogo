import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

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
        axios.get('http://localhost:5000/users/url/' + localStorage.getItem('id'))
            .then(res => {
                this.setState({
                    url: res.data
                })
            })
            .catch(err => console.log(err))
    }
  
    render () {
      return (
          <div className="sticky-profil"><br/>
                <Card>
                    <a href={"/profil/" + this.state.username}>
                        <div className="side-profil-pic">   
                        <ReactPlaceholder
                            type='round'
                            ready={this.state.url}
                            color='#E0E0E0'
                            showLoadingAnimation={true}
                            
                        >
                            <Image
                                src={this.state.url}
                                roundedCircle
                                style={{width: 100, height: 100}}
                            />
                        </ReactPlaceholder>
                        </div>
                    </a>

                    <Card.Body className="text-center">
                        <a href={"/profil/" + this.state.username}>
                            <Card.Title>
                                {this.state.firstName}&nbsp;{this.state.lastName}
                            </Card.Title>
                            <Card.Title>@{this.state.username}</Card.Title><br/>
                        </a>

                        <Card.Text className="container">
                            {this.state.bio}
                        </Card.Text><br/>  
                    </Card.Body>
                </Card>        
          </div>

      );
    }
}