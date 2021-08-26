import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appData: this.props.appData
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let username = document.getElementById('username-input').value;
        let password = document.getElementById('password-input').value;

        let errorMessage = '';

        if (username.length < 1) errorMessage += 'Please Provide a Value for Username\n';
        if (password.length < 1) errorMessage += 'Please Provide a Value for Password';

        if (errorMessage.length > 0) {
            alert(errorMessage);
        } else {
            this.props.handleLogin(username, password);
        }
    }

    render() {
        if (this.state.appData.loggedIn) {
            <div>You Are currently Logged In</div>
        } else {
            return (
                <form>
                    <label for="username">Username</label>
                    <input type="text" id="username-input" name="username"></input>
                    <label for="password">Password</label>
                    <input type="text" id="password-input" name="password"></input>
                    <button onClick={this.handleSubmit}>Submit</button>
                    <Link to="/login/create-account">Create Account</Link>
                </form>
            );
        }

    }
}

export default Login;