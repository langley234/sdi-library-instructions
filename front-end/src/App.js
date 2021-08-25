import './App.css';
import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Book from './components/Book';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookData : null
    }
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
          <Route path="/api/books/:bookID">
            <Book data={this.state.bookData}/>
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
