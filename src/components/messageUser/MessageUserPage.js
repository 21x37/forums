import React from 'react';
import { connect } from 'react-redux';
import MessageUser from './MessageUser';
import MessageUserList from './MessageUserList';
import { fetchRecipient } from '../../actions/messages';

class MessageUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: null
        }
    }
    async componentWillMount() {
        const recipient = await fetchRecipient();
        this.setState({ recipient })
    }
    render () {
        return (
            <div>
                {this.state.recipient ? <MessageUserList recipient={this.state.recipient}/> : ''}
                {this.state.recipient ? <MessageUser recipient={this.state.recipient}/> : ''}
            </div>
        )
    }
}

export default MessageUserPage;