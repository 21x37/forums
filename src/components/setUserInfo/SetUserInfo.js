import React from 'react';
import { connect } from 'react-redux';
import userEmailSelector from '../../selectors/userEmailSelector';
import { startSetUserInfo } from '../../actions/users';
import { startLogout } from '../../actions/auth';


class SetUserInfo extends React.Component {
    constructor(props) {
        super(props);
        
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
        this.setState({ profilePicture });
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
            <div>
                <h2>Set a username and profile picture to cotinue.</h2>
                <button onClick={this.props.startLogout}>Logout</button>
                <p>Username</p>
                <input name='username' placeholder='Shanaynay104' type='text' onChange={this.onUserNameChange} />
                <p>Profile Picture</p>
                <input type='file' onChange={this.onFileUploaded}/>
                {/* <img src={this.state.previewFile}/>  */}
                <button onClick={this.onSubmit}>Save</button>
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