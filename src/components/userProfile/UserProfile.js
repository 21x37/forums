import React from 'react';
import { connect } from 'react-redux';
import { startSetUser, getUserPosts } from '../../actions/userProfile';
import UserDetails from './UserDetails';
import UserPostList from './UserPostList';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentWillMount() {
        const { username }  = this.props.match.params
        this.props.startSetUser(username);
    }
    render() {
        return (
            <div>
                <UserDetails user={this.props.userProfile} />
                <UserPostList user={this.props.userProfile}/>
            </div>  
        )
    }
}

const mapStateToProps = (state) => ({
    userProfile: state.userProfile
})

const mapDispatchToProps = (dispatch) => ({
    startSetUser: (queriedUsername) => dispatch(startSetUser(queriedUsername)),
    getUserPosts: (user) => dispatch(startSetUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);