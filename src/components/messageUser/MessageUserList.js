import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { fetchMessages } from '../../actions/messages';


class MessageUserList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.fetchMessages({ recipient: this.props.recipient, authorId: this.props.auth.databaseId })
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'instant' });
    }
    render() {

        const messagesArr = this.props.messages ? Object.values(this.props.messages).reverse() : [];

        return (
            <div className='message__userList__wrapper'>
                {messagesArr.reverse().map((message) => {
                    console.log(message)
                    return (
                        <div key={uuid()} className='clearfix'>
                            <div className={`message__userList__container ${message.authorUsername === this.props.auth.username ? 'messages__author' : 'messages__recipient'}`}>
                                <p className={`${message.authorUsername === this.props.auth.username ? 'messages__author__text' : 'messages__recipient__text'}`}>{message.message}</p>
                                <h3 className={`${message.authorUsername === this.props.auth.username ? 'messages__author__username' : 'messages__recipient__username'}`}>{message.authorUsername}</h3>
                            </div>
                        </div>
                    )
                })}
                <div ref={el => { this.el = el; }} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    messages: state.messages
})

const mapDispatchToProps = (dispatch) => ({
    fetchMessages: (message) => dispatch(fetchMessages(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageUserList);