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
      appData: {loggedIn: false, currentUserID: -1}
    }
  }

  handleLogin = (id) => {
    this.setState({
      appData: {loggedIn: true, currentUserID: id}
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
        <Navbar />
        <Switch>
          <Route path="/books/:bookID">
            <Book history={this.props.history} appData={this.state.appData} bookData={this.state.bookData}/>
          </Route>  
          <Route path="/login/create-account">
            <CreateAccount history={this.props.history} appData={this.state.appData}/>
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
