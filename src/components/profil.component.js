import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import User from './user.component';
import AddPost from './add-post.component';
import Posts from './posts.component';
import EditProfil from './edit-profil.component';

export default class Profil extends Component {
    constructor(props) {
        super(props);

        this.setRefresh = this.setRefresh.bind(this)
        this.setSettings = this.setSettings.bind(this)

        this.state = {
            needRefresh: false,
            toSettings: true,
            _isMounted: false
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
            _isMounted: true
        })
    }

    componentWillUnmount() {
        this.setState({
            _isMounted: false
        })
    }



    render() {
        return (
            <Router>
                <Jumbotron>
                    <Route path="/profil/:username" exact component={User} />
                    <Nav variant="tabs" defaultActiveKey="#posts">
                        <Nav.Item>
                            <Nav.Link href="#posts" onClick={() => this.setSettings(false)}>Posts</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#edit" onClick={() => this.setSettings(true)}>Edit</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    {this.state._isMounted && this.state.toSettings?
                        (<EditProfil username={this.props.match.params.username} setSettings={this.setSettings} />) :
                        (<><br/><br/><AddPost username={this.props.match.params.username} setRefresh={this.setRefresh}/>
                        <Posts username={this.props.match.params.username} setRefresh={this.setRefresh} needRefresh={this.state.needRefresh}/></>)
                    }
                </Jumbotron>
            </Router>
        )
    }
}