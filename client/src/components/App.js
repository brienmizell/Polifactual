import React, { Component } from "react";
import "../styles/App.css";
import FooterPage from './Footer';

import Login from "./Login";
import Register from "./Register";

import Home from "./HomeComponent";
import Locals from './LocalComponent';
import States from './StateComponent';
import Nationals from './NationalComponent';
import Team from './Team';
import Trello from './Trello';
import Github from './Github';
import LogoutButton from './logoutButton';

import axios from 'axios';

import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "mdbreact";
import { MDBBtn } from "mdbreact";


import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      // isOpen: false
    };
    
    // this.events = [
    //   "load",
    //   "mousemove",
    //   "mousedown",
    //   "scroll",
    //   "keypress"
    // ];

    // this.warn = this.warn.bind(this);
    // this.resetTimeout = this.resetTimeout.bind(this);

    // for (let i in this.events) {
    //   window.addEventListener(this.events[i], this.resetTimeout);
    // }

    // this.setTimeout();

  }

  // clearTimeout() {
  //   if (this.warnTimeout) clearTimeout(this.warnTimeout);

  //   if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  // }

  // setTimeout() {
  //   this.warnTimeout = setTimeout(this.warn, 16 * 1000);

  //   this.logoutTimeout = setTimeout(this.clickLogout, 30 * 1000);
  // }

  // resetTimeout() {
  //   this.clearTimeout();
  //   this.setTimeout();
  // }

  // warn() {
  //   alert("You will be logged out automatically in 1 minute.");
  // }

  // destroy() {
  //   this.clearTimeout();

  //   for (let i in this.events) {
  //     window.removeEventListener(this.events[i], this.resetTimeout);
  //   }
  // }

  PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          this.state.isLoggedIn === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  clickLogout = (props) => {
    return () => {
    axios.post("/api/logout").then(res => {
        props.history.push('/');
        this.setState({ isLoggedIn: false });
    });
  }}

  doLoggedIn = () => {
    this.setState({ isLoggedIn: true });
  }

  componentDidMount() {
    axios.get("/api/verify"). then(res => {
      if (res.data.user){
        this.setState({ isLoggedIn: true }, () => {
          const user = res.data.user;
          sessionStorage.setItem('streetaddress', user.streetaddress);
          sessionStorage.setItem('currentstate', user.currentstate);
          sessionStorage.setItem('zipcode', user.zipcode);
          console.log("logged in");
        });
      } else {
      }
    })
  }
  
  render() {
    return (
      <div className="App bg">
      <Router>
        <>
          <Navbar color="transparent" dark expand="md">
            <NavbarBrand>
              <strong className="white-text">Polifactual</strong>
            </NavbarBrand>
            <NavbarToggler
              onClick={this.toggleCollapse}
            />
            <Collapse
            id="navbarCollapse3"
            isOpen={this.state.isOpen}
            navbar
            >
              <NavbarNav left>
                <NavItem active>
                  <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem active>
                  <NavLink to="/Github">Github</NavLink>
                </NavItem>
                <NavItem active>
                  <NavLink to="/Trello">Trello</NavLink>
                </NavItem>
                <NavItem active>
                  <NavLink to="/Team">Meet The Team</NavLink>
                </NavItem>
                <NavItem>
                  <Dropdown>
                    <DropdownToggle nav caret>
                      <div className="d-none d-md-inline">Profile</div>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="/Local">Local</DropdownItem>
                      <DropdownItem href="/State">State</DropdownItem>
                      <DropdownItem href="/National">National</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              </NavbarNav>
              <NavbarNav right>
                {
                  this.state.isLoggedIn ? <LogoutButton clickLogout={this.clickLogout} /> : <Link to="/Register"><MDBBtn floating gradient="grey lighten-5" onClick={this.clickLogin}>Register</MDBBtn></Link> 
                }
              </NavbarNav>
          
          
            
            </Collapse>
          </Navbar>

        {/* ROUTES */}
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" render={(props) => {
            return (<Home clickLogout={this.clickLogout} {...props} />)
          }} />
          {/* <Route exact path="/Signup" component={Signup} /> */}
          <Route exact path="/Login" render={(props) => {
              return (<Login doLoggedIn={this.doLoggedIn} {...props} />)
          }} />
          <Route path="/Register" render={(props) => {
            return (<Register doLoggedIn={this.doLoggedIn} {...props}/>)
          }} />
          <Route path= "/Github" component={Github}/>
          <Route path= "/Trello" component={Trello}/>
          <Route path= "/Team" component={Team}/>
          <Route path="/Local" component={Locals}/>
          <Route path= "/State" component={States}/>
          <Route path= "/National" component={Nationals}/>
        </>
      </Router>

				{/* Footer */}
				<FooterPage />

			</div>
		);
	}
}


export default App;
