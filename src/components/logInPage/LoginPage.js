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
            password: '',
            logInFormHidden: true
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

        if (this.state.email && this.state.password && !this.state.logInFormHidden) {
            this.props.startLogin(this.state);

        } else {
            this.setState({ logInFormHidden: false })
        }
    }
    render() {
        return (
            <div className='logIn__container'>
                <div className='logIn__wrapper'>


                    <h1 className='logIn__title'>Tattle</h1>
                    
                    <h3 className='logIn__text register'>Join Tattle today.</h3>
                    <Link to='/register'> 
                        <button className='logIn__button register'>Register</button>
                    </Link>
                    <button className='logIn__button logIn' onClick={this.onSubmit}>Login</button>
                    <p className='logIn__error'>{this.props.errorMessage}</p>
                    {!this.state.logInFormHidden &&                     
                    <div className='logIn__form__wrapper'>
                        <input className='logIn__input' name='email' type='text' onChange={this.onChange} placeholder='email'/> 
                        <input className='logIn__input' name='password' type='password' onChange={this.onChange} placeholder='password'/> 
                    </div>
                    }
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

const mapDispatchToProps = (dispatch) => {
    return {
        startLogin: state => dispatch(startLogin(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);