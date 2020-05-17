import React, { Component } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { slide as Menu } from 'react-burger-menu';

export default class Sidebar extends Component {
 
    constructor(props) {
        super(props);

        this.onClickLogOut = this.onClickLogOut.bind(this);
        this.onClickProfil = this.onClickProfil.bind(this);

        this.state = {
            Auth: this.props.authApi
        }
    }


    onClickLogOut(e) {
        axios.post('http://localhost:5000/users/logout', {token: localStorage.getItem('token')})
            .then(res => {
                localStorage.clear();
                localStorage.clear();
                this.state.Auth.setAuth(false);
                window.location = "/login";
            })
            .catch(err => console.log(err))
    }

    onClickProfil(e) {
        const aut = localStorage.getItem("token");
        window.location = aut ? "/profil/" + localStorage.getItem('username') : "/login"
    }
  
    render () {
      return (
        <Menu>
            <Nav.Link href="/" className="custom-nav-item"><i className="fas fa-fw fa-home" style={{ fontSize: '1.4em' }} /> Home</Nav.Link>
            <Nav.Link onClick={this.onClickProfil}  className="custom-nav-item"><i className="fas fa-fw fa-user" style={{ fontSize: '1.4em' }} /> Profil</Nav.Link>
            <Nav.Link href="/trending"  className="custom-nav-item"><i className="fas fa-fw fa-fire-alt" style={{ fontSize: '1.4em' }} /> Trending</Nav.Link>
            <Nav.Link onClick={this.onClickLogOut}  className="custom-nav-item"><i className="fas fa-fw fa-sign-out-alt" style={{ fontSize: '1.4em' }} /> Logout</Nav.Link>
        </Menu>
      );
    }
}