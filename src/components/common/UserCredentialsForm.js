import React from 'react';

const UserCredentialsForm = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <input name='email' type='text' onChange={props.onChange} placeholder='email'/>
                <input name='password' type='password' onChange={props.onChange} placeholder='password'/>
                <button>{props.buttonText}</button>
            </form>
        </div>
    )
}

export default UserCredentialsForm;