// Protected page
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProtectedPage extends Component {
    componentWillMount() {
        this.props.fetchMessage();
    }

    render() {
        return (
            <div>
                <h2>Protected area</h2>
                <p>{this.props.secretMessage}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        secretMessage: state.general.message
    }
}

export default connect(mapStateToProps, actions)(ProtectedPage);
