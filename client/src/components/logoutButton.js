import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "mdbreact";
import { MDBBtn } from "mdbreact";
import {
    withRouter,
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from "react-router-dom";
import axios from 'axios';


let logoutButton = (props) => {
    return (
        <button onClick={props.clickLogout(props)}>Logout</button>
)};
export default withRouter(logoutButton);