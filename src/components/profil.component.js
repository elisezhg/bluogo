import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import User from './user.component';
import AddPost from './add-post.component';
import Posts from './posts.component';

export default class Profil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            date: new Date()
        }
    }


    render() {
        return (
            <Router>
                <Jumbotron>
                    <Route path="/profil/:username" exact component={User} />

                    <div className="text-right">
                        <Button href={"/profil/edit/" + this.props.match.params.username}  variant="outline-secondary" size="sm">Edit</Button>
                    </div><hr/>

                    <AddPost username={this.props.match.params.username}/>
                    {/* <Route path="/profil/:username" exact component={AddPost} /> */}
                    {/* <Route path="/profil/:username" exact component={Post} /> */}
                    <Posts username={this.props.match.params.username}/>
                </Jumbotron>
            </Router>
        )
    }
}