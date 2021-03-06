import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';


import LoginForm from '../../components/forms/LoginForm';
import loginUser from '../../actions/loginUser';
import DismissibleAlert from '../../components/Alerts/DismissibleAlert'

class LoginContainer extends React.Component {
    state = {
        hasLoginError: false,
        errorReason: null,
        showErrorAlert: false,
    }

    onLoginFailure = (response) => {
        console.log("LoginContainer onLoginFailure: ", response);
        this.setState({
            hasLoginError: true,
            errorReason: response.data.reason,
            showAlert: true
        })
    }

    onFormSubmit = (formValues) => {
        console.log("Login Container values: ", formValues)
        this.props.loginUser(
            formValues.username,
            formValues.password,
            this.onLoginFailure
        );
    }

    renderAppropriateContentIfRedirect = (props) => {
        const locationState = props.location.state;
        if (locationState && locationState.isRedirectFromSuccessfulRegister) {
            return (
                <Alert variant="success">
                    <Alert.Heading>Registration Completed!</Alert.Heading>
                    <p>Please login to continue</p>
                </Alert>
            )
        }
    }

    render() {
        console.log("Login Props: ", this.props)

        if (this.props.isUserLoggedIn) {
            return <Redirect to="/" />
        }
        else {
            return (
                <div className="centered-content">
                    <Container>
                        {this.renderAppropriateContentIfRedirect(this.props)}
                        <DismissibleAlert
                            variant="danger"
                            heading="Login Unsuccessful"
                            body={this.state.errorReason}
                            show={this.state.showErrorAlert}
                            onDismiss={() => this.setState({ showErrorAlert: false })}
                        />
                        <LoginForm onFormSubmit={this.onFormSubmit} />
                    </Container>
                </div >
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.user.loggedIn,
    }
}

export default connect(mapStateToProps, { loginUser })(LoginContainer);
