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
            <div className='notification__container' hidden={this.props.isHidden}>
                <div className='notification__wrapper'>
                    {/* <div className='notification__title__wrapper'>
                        <h1 className='notification__title'>Notifications</h1>
                    </div> */}
                    {this.props.notifications && this.props.notifications.map((notification) => {
                        return (
                            <IndividualNotification key={uuid()} notification={notification}/>
                        )

                    })}
                    <Link to='/notifications'>
                            <div className='see__all__notifications__wrapper'>
                                <button className="button button--link">See all notifications</button>
                            </div>
                        </Link>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    notifications: state.notifications
})

export default connect(mapStateToProps)(Notification);