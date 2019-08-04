import React from 'react';
import UserCredentialsForm from '../common/UserCredentialsForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRegisterUser } from '../../actions/auth';
import { startClearAuthError } from '../../actions/errors';
import errorSelector from '../../selectors/errorSelector';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        const value = e.target.value;
        const formName = e.target.name;

        this.setState({ [formName]: value })
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.startRegisterUser(this.state);
    }
    render() {
        return (
            <div>
                <UserCredentialsForm onChange={this.onChange} onSubmit={this.onSubmit} buttonText="Register"/>
                <p>{this.props.errorMessage}</p>
                <Link
                to='/'
                onClick={this.props.startClearAuthError()}
                >
                    <p>Go back to login screen.</p>
                </Link>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return ({
        errorMessage: errorSelector(state.error)
    })
}

const mapDispatchToProps = (dispatch) => ({
    startRegisterUser: state => dispatch(startRegisterUser(state)),
    startClearAuthError: () => dispatch(startClearAuthError())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);