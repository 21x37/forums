import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { forumValidator } from '../../selectors/fieldValidator';
import { createPost } from '../../actions/postForum';


class PostForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            forumName: '',
            date: '',
            author: '',
            comments: [],
            upVotes: 0,
            error: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        // Gettting the authenticated user to be set as author.
        const author = this.props.auth
        // Getting the parent forum name to identify where this post belongs.
        const { forumName } = this.props.match.params
        const date = moment().format('MMMM Do YYYY')

        this.setState({ author, forumName, date })
    }
    onChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({ [name]: value })
    }
    onSubmit(e) {
        e.preventDefault();
        const stateClone = _.omit(this.state, 'error');

        const noFieldErrors = forumValidator(stateClone);

        if (noFieldErrors === true) {
            this.setState({ error: '' })

            this.props.createPost(stateClone)
            .then(({ key }) => {
                this.props.history.push(`/t/${this.state.forumName}/${key}`)
            });
        } else {
            this.setState({ error: noFieldErrors })
        }
    }
    render() {
        return (
            <div className='post__forum__container'>
                <div className='post__forum__buttons__flex'>
                    <Link className='subForum__back__button' to={`/t/${this.state.forumName}`}><button className='forumList__back__button'>Back</button></Link>
                    <button className='forumList__newPost__button post__button' onClick={this.onSubmit}>Post</button>
                </div>
                <p>{this.state.error}</p>
                <input
                className='post__forum__input'
                name='title'
                type='text'
                placeholder='title'
                onChange={this.onChange}
                />
                <br/>
                <textarea
                className='post__forum__textarea'
                name='text'
                onChange={this.onChange}
                />
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    createPost: post => dispatch(createPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForum);