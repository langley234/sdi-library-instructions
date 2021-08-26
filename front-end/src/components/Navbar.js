import React from 'react';
import '../css/navbar.css'
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

        handleLoginButtonClick = () => {
        this.props.history.push('/login');
        this.props.history.go(0);
    }

    handleLogout = () => {
        this.props.history.push('/');
        this.props.history.go(0);
    }

    render() {
        return (
            <div className="main_bar">
                <Link to="/"><button className="bar_element" >SDI Library Page</button></Link>
                {
                    this.props.appData.loggedIn ?
                    <button className="bar_element" onClick={this.handleLogout}>Log Out</button> :
                    <button className="bar_element" onClick={this.handleLoginButtonClick}>Login</button>
                }
                {
                    this.props.appData.userData.user_authority === 'librarian' ?
                    <h3>Henlo Friend</h3> :
                    <h3>You aint no friend of mine</h3>
                }
            </div>
        );
    }
}

export default Navbar;