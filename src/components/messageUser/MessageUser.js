import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { startSendMessage } from '../../actions/messages';


class MessageUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
            message: '',
            date: moment(),
            unRead: true
        }

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ message: e.target.value })
    }
    onClick() {
        const recipient = this.props.recipient

        const message = {
            ...this.state,
            date: this.state.date.valueOf(),
            recipient,
            authorId: this.props.auth.databaseId,
            authorUsername: this.props.auth.username
        }

        this.props.startSendMessage(message);
    }
    render() {
        return (
            <div>
                <input type='text' onChange={this.onChange}/>
                <button onClick={this.onClick}>Send</button>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
    startSendMessage: (message) => dispatch(startSendMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageUser);