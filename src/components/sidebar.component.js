import React, { Component } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';

// export default class Sidebar extends Component {
//     render() {

//         return (
//           //   <Navbar bg="dark" variant="dark" expand="lg">
//           //   <Navbar.Brand href="/">SocialMedia</Navbar.Brand>
//           //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           //   <Navbar.Collapse id="basic-navbar-nav">
//           //     <Nav className="mr-auto">
//           //       <Nav.Link href="/">Home</Nav.Link>
//           //       <Nav.Link href="/login">Login</Nav.Link>
//           //       <Nav.Link href="/register">Reg</Nav.Link>
//           //       <Nav.Link href="/profil">Profil</Nav.Link>
//           //       <Nav.Link href="/">Trends</Nav.Link>
//           //       <Nav.Link href="/">Logout</Nav.Link>

//           //     </Nav>
//           //     <Form inline>
//           //       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//           //       <Button variant="outline-success">Search user</Button>
//           //     </Form>
//           //   </Navbar.Collapse>
//           // </Navbar>
          

//         )
//     }
// }

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class SideBar extends Component {
  render() {
      return (
<SideNav
    onSelect={(selected) => {
        window.location = selected;
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected= {window.location.pathname}>
        <NavItem eventKey="/">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>

        <NavItem eventKey="/login">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Login
            </NavText>
        </NavItem>

        <NavItem eventKey="/register">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Register
            </NavText>
        </NavItem>


        <NavItem eventKey="/profil/acapella">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Profil
            </NavText>
        </NavItem>


        <NavItem eventKey="/">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Trends
            </NavText>
        </NavItem>

        <NavItem eventKey="/logout">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Log out
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
      );
  }
}