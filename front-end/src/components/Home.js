import React from 'react';

import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookData : null,
            bookDataLoaded : false,
            error : {status: false, message: 'No Error'}
        }
    }

    componentDidMount() {
        const headers = { 'Content-Type' : 'application/json' };

        fetch("http://localhost:3001/api/books", {
            method: 'GET',
            mode: 'cors',
            headers
        })
        .then((result) => {
            if (result.status === 200) {
                result = result.json()
                    .then((result) => {
                        this.setState({
                            bookData: result,
                            bookDataLoaded: true
                        })
                    })
            }
            else if (result.status === 404) {
                this.setState({
                    bookDataLoaded: true,
                    error: {status: true, message: 'No Data Found'}
                });
            }
            else if (result.status === 400) {
                this.setState({
                    bookDataLoaded: true,
                    error: {status: true, message: 'Improper Data Used for GET Request'}
                });
            } else {
                this.setState({
                    bookDataLoaded: true,
                    error: {status: true, message: 'Unknown Error Occurred'}
                })
            }
        },
        (error) => {
            console.log('Error : ', error);
            this.setState({
                bookDataLoaded: true,
                error: {status: true, message: error}
            });
        });
    }

    render() {
        if (this.state.error.status === true) {
            return (
                <div>
                    {`${this.state.error.message}`}
                </div>
            );
        } else if (this.state.bookDataLoaded && this.state.error.status !== true) {
            return (
                <ul>
                    {
                        this.state.bookData.map((item) => {
                            return <Link to={`/books/${item.id}`} onClick={() => { this.props.handleBookClick(item) }}>
                                <li>{`Title : ${item.title} Author : ${item.author} ISBN # ${item.isbn} Checked-Out? : ${item['checked-in']}`}</li>
                            </Link>
                        })
                    }
                </ul>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }

    }
}

export default Home;