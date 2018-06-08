import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, ControlLabel, Button, Alert } from 'react-bootstrap';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password });
    }

    handleAlertDismiss() {
        this.props.dismissAuthError();
    }

    renderAlert() {
        return this.props.errorMessage ?
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
            <h4>{this.props.errorMessage.title}</h4>
            <p>{this.props.errorMessage.description}</p>
        </Alert>
        : null;
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel} htmlFor="email">
                        Email:
                    </Col>
                    <Col sm={10}>
                        <Field
                            type="text"
                            component="input"
                            className="form-control"
                            name="email"
                            id="email"/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel} htmlFor="password">
                        Password:
                    </Col>
                    <Col sm={10}>
                        <Field
                            type="password"
                            component="input"
                            className="form-control"
                            name="password"
                            id="password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        {this.renderAlert()}
                        <Button type="submit">
                            Sign in
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

Signin = reduxForm({
    form: 'signin',
    enableReinitialize: true
})(Signin);

export default connect(mapStateToProps, actions)(Signin);
