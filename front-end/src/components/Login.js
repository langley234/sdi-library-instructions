import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appData: this.props.appData
        }
    }

    render() {
        if (this.state.appData.loggedIn) {
            <div>You Are currently Logged In</div>
        } else {
            return (
                <form>
                    <label for="username">Username</label>
                    <input type="text" id="login-username-input" name="username"></input>
                    <button>Submit</button>
                    <Link to="/login/create-account">Create Account</Link>
                </form>
            );
        }

    }
}

export default Login;