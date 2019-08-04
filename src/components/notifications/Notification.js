import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IndividualNotification from './IndividualNotification';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div hidden={this.props.isHidden}>
                {this.props.notifications && this.props.notifications.map((notification) => {
                    return (
                        <IndividualNotification key={uuid()} notification={notification}/>
                    )

                })}
                <Link to='/notifications'><button className="button button--link">See all notifications</button></Link>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    notifications: state.notifications
})

export default connect(mapStateToProps)(Notification);