import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import User from './user.component';
import AddPost from './add-post.component';
import Posts from './posts.component';
import EditProfil from './edit-profil.component';

export default class Profil extends Component {
    constructor(props) {
        super(props);

        this.setRefresh = this.setRefresh.bind(this);
        this.setSettings = this.setSettings.bind(this);
        this.showUserProfil = this.showUserProfil.bind(this);
        this.showProfil = this.showProfil.bind(this);

        this.state = {
            needRefresh: false,
            toSettings: false,
            _isMounted: false,
            userProfil: props.match.params.username === localStorage.getItem('username')
        }
    }

    setRefresh(bool) {
        this.setState({
            needRefresh: bool
        })
    }

    setSettings(bool) {
        this.setState({
            toSettings: bool
        })
    }

    componentDidMount() {
        this.setState({
            toSettings: false,
            _isMounted: true,
        })
        //get username from token
    }

    componentWillUnmount() {
        this.setState({
            _isMounted: false
        })
    }

    showUserProfil() {
        if (this.state._isMounted && this.state.toSettings) {
            return <EditProfil username={this.props.match.params.username} setSettings={this.setSettings} />
        } else {
            return (<><br/><AddPost username={this.props.match.params.username} setRefresh={this.setRefresh}/>
            <Posts username={this.props.match.params.username} setRefresh={this.setRefresh} needRefresh={this.state.needRefresh}/></>)
        }
    }

    showProfil() {
        return (<Posts username={this.props.match.params.username} setRefresh={this.setRefresh} needRefresh={this.state.needRefresh}/>)
    }



    render() {
        return (
            <Router>
                <Jumbotron>
                    <Route path="/profil/:username" exact component={User} /><br/><br/>
                    <Card className="card-profil-container">
                        {this.state.userProfil ? 
                            (<Card.Header>
                                <Nav variant="tabs" defaultActiveKey="#posts">
                                    <Nav.Item>
                                        <Nav.Link href="#posts" onClick={() => this.setSettings(false)}>Posts</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#edit" onClick={() => this.setSettings(true)}>Edit</Nav.Link>
                                    </Nav.Item>
                                </Nav>      
                            </Card.Header>) : (<></>)
                        }

                        <Card.Body>
                            {this.state.userProfil? this.showUserProfil() : this.showProfil()}

                        </Card.Body>
                    </Card>
                </Jumbotron>
            </Router>
        )
    }
}