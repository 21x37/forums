import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ForumPageList from './ForumPageList';
import { startSearchForums } from '../../actions/search';

class ForumPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forumName: window.location.href.split('/t/').pop()
        }

        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        const query = e.target.value;

        this.props.startSearchForums({ subForumName: this.state.forumName, query })
    };
    render() {
        return (
            <div className='forumList__wrapper'>
                <div className='forumList__flex'>
                    <Link to='/dashboard'><button className='forumList__back__button'>Back</button> </Link>                
                    <input className='forumList__search' type='text' placeholder='search' 
                    onChange={this.onChange}/>
                    <Link to={`/t/${this.state.forumName}/post/`}><button className='forumList__newPost__button'>New Post</button></Link>
                </div>
                <ForumPageList forumName={this.state.forumName}/>
            </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => ({
    startSearchForums: (forumData) => dispatch(startSearchForums(forumData))
});


export default connect(undefined, mapDispatchToProps)(ForumPage);