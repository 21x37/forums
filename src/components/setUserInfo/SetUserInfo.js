import React from 'react';
import { connect } from 'react-redux';
import userEmailSelector from '../../selectors/userEmailSelector';
import { startSetUserInfo } from '../../actions/users';
import { startLogout } from '../../actions/auth';


class SetUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUploaded: false
        }
        
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onFileUploaded = this.onFileUploaded.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    async getEmail() {
        const email = await userEmailSelector(this.props.auth.uid);
        this.setState({ email, componentDidMount: true })
    }
    onUserNameChange(e) {
        const username = e.target.value;
        this.setState({ username })
    }
    onFileUploaded(e) {
        const profilePicture = e.target.files[0]
        this.setState({ profilePicture, fileUploaded: true });
    }
    async onSubmit() {
        // TODO: Refactor getEmail

        await this.getEmail()

        const userInfo = {
            uid: this.props.auth.uid,
            photo: this.state.profilePicture,
            username: this.state.username,
            email: this.state.email
        }


        this.props.startSetUserInfo(userInfo);

    }
    render() {
        return (
            <div className='set__user__info__container'>
                <div className='set__user__info__wrapper'>
                    <h1 className='logIn__title'>Tattle</h1>
                    <h2 className='set__user__info'>Set a username and profile picture to cotinue</h2>
                    <button className='logOut__button' onClick={this.props.startLogout}>Logout</button>
                    <button className={`save__button ${this.state.username && this.state.profilePicture ? 'formFilledOut' : ''}`} onClick={this.onSubmit}>Save</button>
                    <p className='set__username__text'>Username</p>
                    <input className='set__username__input' name='username' placeholder='Shanaynay104' type='text' onChange={this.onUserNameChange} />
                    <div className='set__profilePicture__wrapper'>
                        <p className='set__profilePicture__text'>Profile Picture</p>
                        <label for='profilePicture__upload'><div className={`set__profilePicture__button ${this.state.fileUploaded ? 'profilePicture__uploaded' : ''}`}>{this.state.fileUploaded ? 'Uploaded' : 'Upload'}</div></label>
                        <input style={{display: 'none'}} id='profilePicture__upload' className='set__profilePicture__input' type='file' onChange={this.onFileUploaded}/>
                    </div>
                </div>
            </div>
        );

    };
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    startSetUserInfo: (userInfo) => dispatch(startSetUserInfo(userInfo)),
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(SetUserInfo);