import './App.css';
import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Book from './components/Book';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookData : null,
      appData: {loggedIn: false, userData: {}}
    }
  }

  handleLogin = (username, password) => {
    const headers = { 'Content-Type': 'application/json' };

    fetch(`http://localhost:3001/login`, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((result) => {
        if (result.status === 200) {
          result = result.json()
            .then((result) => {
              alert(`Logged in as User : ${username}`);
              this.props.history.go(-1);
              this.setState({
                appData: { loggedIn: true, userData: result[0] }
              })
            })
        }
        else if (result.status === 404) {
          console.log("ERROR GETTING USER DATA");
        }
        else if (result.status === 400) {
          console.log("INVALID DATA");
        }
      })
  }

  handleBookClick = (bookData) => {
    this.setState({
      bookData: bookData
    })
  }

  render() {
    return (
      <Router>
        <Navbar appData={this.state.appData} history={this.props.history}/>
        <Switch>
          <Route path="/books/:bookID">
            <Book history={this.props.history} appData={this.state.appData} bookData={this.state.bookData}/>
          </Route>  
          <Route path="/login/create-account">
            <CreateAccount history={this.props.history} appData={this.state.appData} handleLogin={this.handleLogin}/>
          </Route>
          <Route path="/login">
            <Login history={this.props.history} appData={this.state.appData} handleLogin={this.handleLogin}/>
          </Route>
          <Route path="/">
            <Home handleBookClick={this.handleBookClick}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
