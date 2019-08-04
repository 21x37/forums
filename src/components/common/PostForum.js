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
            <div>
                <Link to={`/t/${this.state.forumName}`}>Back</Link>
                <p>{this.state.error}</p>
                <input
                name='title'
                type='text'
                placeholder='title'
                onChange={this.onChange}
                />
                <textarea
                name='text'
                onChange={this.onChange}
                />
                <button onClick={this.onSubmit}>Post</button>
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