import React from 'react';
import UserCredentialsForm from '../common/UserCredentialsForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRegisterUser } from '../../actions/auth';
import { clearAuthError } from '../../actions/errors';
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
                <div>
                    <h1 className='logIn__title registerPage'>Tattle</h1>
                    <p className='register__error'>{this.props.errorMessage}</p>
                    <form>
                        <input className='logIn__input' name='email' type='text' onChange={this.onChange} placeholder='email'/>
                        <input className='logIn__input' name='password' type='password' onChange={this.onChange} placeholder='password'/>
                    </form>
                </div>
                <div className='registerPage__flex'>
                    <Link className='register__back__wrapper' to='/' onClick={() => this.props.clearAuthError()}>
                        <button className='logIn__button logIn register__back'>Back</button>
                    </Link>
                    <button onClick={this.onSubmit} className='logIn__button register registerPage registerPageButton'>Register</button>
                </div>
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
    clearAuthError: () => dispatch(clearAuthError())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);