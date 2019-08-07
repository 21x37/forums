import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserMessagesList, startReadMessage } from '../../actions/messages';
import { startSearchUsers, startClearUsers } from '../../actions/search';
import SearchList from '../search/SearchList';
import sortMessages from '../../selectors/sortMessages';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.userNameSubString = this.userNameSubString.bind(this);
        this.lastMessageSubString = this.lastMessageSubString.bind(this);
    }
    async componentWillMount() {
        const messages = await setUserMessagesList({ userId: this.props.auth.databaseId })
        const users = sortMessages(messages);
        this.setState({ users })
    }
    onBlur() {
        setTimeout(() => {
          this.props.startClearUsers();
        }, 150)
    }
    userNameSubString(string) {
        return `${string.substring(0, 7)}...`;
    }
    lastMessageSubString(string) {
        return `${string.substring(0,15)}...`
    }
    onChange(e) {
        const query = e.target.value;
        this.props.startSearchUsers(query)
    }
    onClick(userMessages) {
        const message = {
            ...userMessages,
            auth: this.props.auth
        }

        console.log(message);
        this.props.startReadMessage({ message }) 
    }
    render() {
        return (        
            <div>
                {this.state.users.map((user) => {
                    console.log(user);
                    return (
                        <Link style={{ textDecoration: 'none' }} to={`/messages/${user.username}`} key={uuid()} onClick={() => this.onClick(user)}>
                                <div className={`messages__container ${user.unRead && user.recipientUsername === this.props.auth.username ? 'messages_unread' : '' }`}>
                                    <img className='messages__profile__picture' src={user.profilePicture} style={{ width: '75px', height: '75px' }}/>
                                    <p className='messages__lastMessage'>{user.lastMessage.length > 15 ? this.lastMessageSubString(user.lastMessage) : user.lastMessage}</p>
                                    <p className='messages__username'>{user.username.length > 7 ? this.userNameSubString(user.username) : user.username}</p>
                                </div>
                        </Link>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    startSearchUsers: (query) => dispatch(startSearchUsers(query)),
    startClearUsers: () => dispatch(startClearUsers()),
    startReadMessage: (message) => dispatch(startReadMessage(message))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Messages);