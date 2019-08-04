import React from 'react';

class ForumThreadInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        const text = e.target.value;
        this.setState({ text })
    }
    onSubmit(e) {
        e.preventDefault();

        // Dispatch action here. 🕊
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type='text' onChange={this.onChange}/>
                <button>Post</button>
            </form>
        )
    };
};

export default ForumThreadInput;