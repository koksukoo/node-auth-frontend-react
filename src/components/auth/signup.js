import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit(formProps) {
       this.props.signupUser(formProps);
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

    renderField(fieldProps) {
        return (
        <div>
            <FormControl
                {...fieldProps.input}
                type={fieldProps.type}
                id={fieldProps.id}
                className={
                    cn({ 'validation-error': fieldProps.meta.touched && fieldProps.meta.error })
                }/>
            {fieldProps.meta.touched && fieldProps.meta.error && <span className="text-danger">{fieldProps.meta.error}</span>}
        </div>
        )};

    render() {
        const { handleSubmit, error, submitting } = this.props;

        return (
            <Form horizontal onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel} htmlFor="email">
                        Email:
                    </Col>
                    <Col sm={10}>
                        <Field
                            type="text"
                            component={this.renderField}
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
                            component={this.renderField}
                            name="password"
                            id="password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel} htmlFor="password-confirm">
                        Password confirm:
                    </Col>
                    <Col sm={10}>
                        <Field
                            type="password"
                            component={this.renderField}
                            name="password-confirm"
                            id="password-confirm" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        {this.renderAlert()}
                        <Button type="submit" disabled={submitting}>
                            Sign up
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

function validate(formProps) {
    const errors = {};
    const keys = ['email','password','password-confirm'];

    for (let key of keys) {
        if (!formProps[key]) {
            errors[key] = `Please fill the ${key} field`;
        }
    }

    if (formProps.password !== formProps['password-confirm']) {
        errors.password = 'Passwords must match';
    }
    return errors;
}

Signup = reduxForm({
    form: 'signup',
    enableReinitialize: true,
    validate
})(Signup);

export default connect(mapStateToProps, actions)(Signup);
