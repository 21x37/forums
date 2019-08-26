import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { startReadNotifications } from '../actions/notifications';
import { startSearchUsers, startClearUsers } from '../actions/search';
import Notification from './notifications/Notification';
import SearchList from './search/SearchList';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: true
    }

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onBlur() {
    setTimeout(() => {
      this.props.startClearUsers();
    }, 150)
  }
  onChange(e) {
    const query = e.target.value;
    this.props.startSearchUsers(query)
  }
  onClick() {
    const userId = this.props.auth.databaseId;

    if (this.state.isHidden) {
      this.setState({ isHidden: false })
    } else {
      this.setState({ isHidden: true })
      this.props.startReadNotifications({ userId })
    }
  }
  render() {
    return (
      <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <img className='header__logo' src='https://dewey.tailorbrands.com/production/brand_version_mockup_image/-801/-2088371801_9892911a-c466-4a69-b7c2-85e2eaffa5a6.png?cb=1564973977'/>
          </Link>
          <input className="header__search" type='text' onBlur={this.onBlur} onChange={this.onChange} placeholder="🔍"/>
          <div className='search__wrapper'>
            <SearchList to=''/>
          </div>
          <div className="header__nav">
            <button style={{ WebkitAppearance: 'none', color: '#0079D3' }} className="button button--link" onClick={this.onClick}><p className='nav__text'>Notifications</p></button>
            <Link to='/messages'><button style={{ WebkitAppearance: 'none', color: '#0079D3' }} className='button--link'><p className='nav__text'>Messages</p></button></Link>
            <Link to={`/${this.props.auth.username.toLowerCase()}`}><button style={{ WebkitAppearance: 'none', color: '#0079D3' }} className="button--link"><p className='nav__text'>Profile</p></button></Link>
            <button style={{ WebkitAppearance: 'none', color: '#0079D3' }} className="button button--link" onClick={this.props.startLogout}><p className='nav__text'>Logout</p></button>
          </div>
          <Notification isHidden={this.state.isHidden}/>
        </div>
      </div>
    </header>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  startReadNotifications: (databaseId) => dispatch(startReadNotifications(databaseId)),
  startSearchUsers: (query) => dispatch(startSearchUsers(query)),
  startClearUsers: () => dispatch(startClearUsers())
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
