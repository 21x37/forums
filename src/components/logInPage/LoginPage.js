import React from 'react';
import { Link } from 'react-router-dom';
import UserCredentialsForm from '../common/UserCredentialsForm';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/auth';
import errorSelector from '../../selectors/errorSelector';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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

        this.props.startLogin(this.state);
    }
    render() {
        return (
            <div>
                <UserCredentialsForm onChange={this.onChange} onSubmit={this.onSubmit} buttonText="Login"/>
                <p>{this.props.errorMessage}</p>
                <Link to='/register'> 
                    <button>Register</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: state => dispatch(startLogin(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);