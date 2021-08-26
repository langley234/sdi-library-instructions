import React from 'react';

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: {status: false, message: 'No Error'}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let firstName = document.getElementById('first-name-input').value;
        let lastName = document.getElementById('last-name-input').value;
        let username = document.getElementById('username-input').value;
        let password = document.getElementById('password-input').value;

        let errorMessage = '';

        if (firstName.length < 1) errorMessage += 'Please provide a value for First Name \n';
        if (lastName.length < 1) errorMessage += 'Please provide a value for Last Name \n';
        if (username.length < 1) errorMessage += 'Please provide a value for Username \n';
        if (password.length < 1) errorMessage += 'Please provide a value for Password';
        if (errorMessage.length > 0) {
            alert(errorMessage);
        } else {
            const headers = { 'Content-Type': 'application/json' };

            fetch(`http://localhost:3001/login/create-account`, {
                method: 'POST',
                mode: 'cors',
                headers,
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password
                })
            })
                .then((result) => {
                    if (result.status === 201) {
                        this.props.handleLogin(username, password)
                    }
                })
        }
    }

    render() {
        return (
            <form>
                <label for="first-name">First Name</label>
                <input type="text" id="first-name-input" name="first-name"></input>
                <label for="last-name">Last Name</label>
                <input type="text" id="last-name-input" name="last-name"></input>
                <label for="username">Username</label>
                <input type="text" id="username-input" name="username"></input>
                <label for="password">Password</label>
                <input type="text" id="password-input"></input>
                <button onClick={ this.handleSubmit }>Submit</button>
            </form>
        );
    }
}

export default CreateAccount;