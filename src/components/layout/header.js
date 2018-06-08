import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {

    renderLinks() {
        const links = {
            authenticated: [
                {to: '/protected', title: 'Protected area'},
                {to: '/signout',   title: 'Sign Out'}],
            unauthenticated: [
                {to: '/signin',    title: 'Sign In'},
                {to: '/signup',    title: 'Sign Up'}],
            shared: []
        };

        const linksToRender = this.props.authenticated ?
            [...links.authenticated, ...links.shared]  :
            [...links.unauthenticated, ...links.shared];

        return linksToRender.map((link,index) =>
             <LinkContainer to={link.to} key={index}>
             <NavItem>
                    {link.title}
                </NavItem>
            </LinkContainer>
        );
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Auth-system</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {this.renderLinks()}
                </Nav>
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default withRouter(connect(mapStateToProps)(Header));
