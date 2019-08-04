import React from 'react';
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
    componentWillReceiveProps() {

    }
    render() {

        const messagesArr = this.props.messages ? Object.values(this.props.messages).reverse() : [];

        return (
            <div>
                {messagesArr.map((message) => {
                    return (
                        <div key={uuid()}>
                            <p>{message.message}</p>
                            <h3>{message.authorUsername}</h3>
                        </div>
                    )
                })}
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