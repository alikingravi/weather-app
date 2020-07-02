import React, { useState, Fragment, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import authService from "../services/auth.service";
import { UserContext } from "../contexts/UserContext";
import { REMOVE_USER } from "../reducers/types";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useContext(UserContext);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);
  const logout = () => {
    authService.logout();
    dispatch({ type: REMOVE_USER });
    console.log("Logout user: ", user);
    history.push("/login");
  };

  const guestLinks = (
    <Fragment>
      <NavItem>
        <NavLink tag={Link} to="/login">
          Login
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/register">
          Register
        </NavLink>
      </NavItem>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <NavItem>
        <NavLink tag={Link} to="/dashboard">
          Dashboard
        </NavLink>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {user && user.data && user.data.name}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={logout}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="light" light expand="md">
        <div className="container">
          <NavbarBrand tag={Link} to="/">
            <span className="text-burnt-amber">Weather App</span>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {user && user ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
