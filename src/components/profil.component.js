import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import User from './user.component';
import AddPost from './add-post.component';

export default class Profil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            date: new Date()
        }
    }

    componentDidMount() {
        // Axios.get('http://localhost:5000/users/' + this.props.match.params.id)
        //     .then(resp => {
        //         this.setState({

        //         })
        //     })
    }

    render() {
        return (
            <Router>
                <Jumbotron>
                    <Route path="/profil/:username" exact component={User} />

                    <div className="text-right">
                        <Button href={"/profil/edit/" + this.props.match.params.username}  variant="outline-secondary" size="sm">Edit</Button>
                    </div><hr/>

                    <Route path="/profil/:username" exact component={AddPost} />
                </Jumbotron>
            </Router>
        )
    }
}