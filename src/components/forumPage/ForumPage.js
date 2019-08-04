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
            <div>
                <Link to='/dashboard'><p>Back</p></Link>
                <input type='text' placeholder='search' 
                onChange={this.onChange}
                />
                
                
                <Link to={`/t/${this.state.forumName}/post/`}>
                    <button>New Post</button>
                </Link>
    
                <p>This is the forum page.</p>
                <ForumPageList forumName={this.state.forumName}/>
            </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => ({
    startSearchForums: (forumData) => dispatch(startSearchForums(forumData))
});


export default connect(undefined, mapDispatchToProps)(ForumPage);