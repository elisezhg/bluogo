import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';

import Sidebar from "./components/sidebar.component"
import Home from "./components/home.component";
import Trending from "./components/trending.component";
import LogIn from "./components/login.component";
import Register from "./components/register.component";
import Profil from "./components/profil.component";
import EditProfil from "./components/edit-profil.component";

import AuthApi from "./utils/auth-api";

function App() {
    const [auth, setAuth] = React.useState(false);

    if (localStorage.getItem("token") && auth === false) {
        setAuth(true);
    }

    return (
        <AuthApi.Provider value={{auth, setAuth}}>
            <Router>
                <Routes/>
            </Router>
        </AuthApi.Provider>
    );
}


const Routes = () => {
    const Auth = React.useContext(AuthApi);

    return (
        <div>
            <Sidebar authApi={Auth}/>
            <Switch>
                <Route path="/" authApi={Auth} exact component={Home} />
                <Route path="/trending" authApi={Auth} exact component={Trending} />
                <ProtectedRoute path="/login" authApi={Auth} exact component={LogIn} />
                <ProtectedRoute path="/register" authApi={Auth} exact component={Register} />
                <Route path="/profil/:username" authApi={Auth} exact component={Profil} />
                <Route path="/profil/edit/:username" authApi={Auth} exact component={EditProfil} />
                <Route authApi={Auth} component={Home} />
            </Switch>            
        </div>

    )
}

const ProtectedRoute = ({authApi, component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = {(props) => 
                authApi.auth? (<Redirect to="/"/>) : (<Component authApi={authApi} {...props} />)
            }
        />
    )
}


export default App;
