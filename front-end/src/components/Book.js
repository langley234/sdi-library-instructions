import React from 'react';

class Book extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);
        let bookID = -1;

        if (this.props.bookData === undefined || this.props.bookData === null) {
            bookID = this.resolveBookID();
        } else {
            bookID = this.props.bookData.book_id;
        }

        this.state = {
            isLoaded: false,
            data: null,
            id: bookID,
            appData: this.props.appData,
            rerender: false,
            error: {status: false, message: 'No Error'}
        }
    }

    resolveBookID = () => {
        let path = window.location.pathname;
        let index = path.lastIndexOf(`/`);
        let idStr = path.slice(index + 1);
        let idInt = parseInt(idStr);

        if (idInt === undefined || typeof idInt !== 'number') {
            this.setState({
                isLoaded: true,
                error: {status: true, message: 'Invalid ID'}
            })
        }

        return idInt;
    }

    fetchBookData = () => {
        const headers = { 'Content-Type' : 'application/json' };

        fetch(`http://localhost:3001/api/books/${this.state.id}`, {
            method: 'GET',
            mode: 'cors',
            headers
        })
            .then((result) => {
                if (result.status === 200) {
                    result = result.json()
                        .then((result) => {
                            this.setState({
                                isLoaded: true,
                                data: result
                            });
                        })
                }
                else if (result.status === 400) {
                    this.setState({
                        isLoaded: true,
                        error: { status: true, message: `Invalid ID` }
                    })
                }
                else if (result.status === 404) {
                    this.setState({
                        isLoaded: true,
                        error: { status: true, message: `No Book with that ID exists` }
                    })
                } else {
                    this.setState({
                        isLoaded: true,
                        error: { status: true, message: `Unknown Error Occurred` }
                    })
                }
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: { status: true, message: error }
                    })
                });
    }

    componentDidMount() { 
        this.fetchBookData();
    }

    translateCheckedInStatus = (booler) => {
        if (booler === true) return 'Not Available';
        if (booler === false) return 'Available';
    }

    renderCheckedOutData = () => {
        if (this.state.appData.loggedIn === true) {
            return (
                <ul>
                    {
                        this.state.appData.userData.user_id == this.state.data.user_id ?
                            <li>{`Checked out by you. Please Return by ${this.state.data.check_in_date} `}</li> :
                            <li>{`Currently Checked Out By User : ${this.state.data.user_id}`}</li>
                    }
                </ul>
            );
        } else {
            return (
                <ul>
                    <li>{`Available On : ${this.state.data.check_in_date}`}</li>
                    <li>{`Currently Checked Out By User : ${this.state.data.user_id}`}</li>
                </ul>
            );
        }
    }

    handleCheckout = () => {
        if (this.props.appData.loggedIn) {
            const headers = { 'Content-Type': 'application/json' };

            fetch(`http://localhost:3001/api/books/${this.state.id}/checkout/${this.state.appData.userData.user_id}`, {
                method: 'POST',
                mode: 'cors',
                headers
            })
                .then((result) => {
                    if (result.status === 201) {
                        this.fetchBookData();

                    }
                    else if (result.status === 418) {
                        console.log('418 Error');
                    }
                })
        } else {
            this.props.history.push('/login');
            this.props.history.go(0);
        }

    }

    render() {
        if (this.state.error.status === true) {
            return (
                <div>{`${this.state.error.message}`}</div>
            );
        }
        else if (this.state.error.status !== true && this.state.isLoaded) {
            return (
                <ul>
                    <li>{`Title ${this.state.data.book_title}`}</li>
                    <li>{`Author : ${this.state.data.book_author}`}</li>
                    <li>{`ISBN : ${this.state.data.book_isbn}`}</li>
                    <li>{`Status : ${this.translateCheckedInStatus(this.state.data.book_checked_out)}`}</li>
                    {
                        !this.state.data.book_checked_out ?
                            <button onClick={this.handleCheckout}>Check Out</button> :
                            <div>{this.renderCheckedOutData()}</div>
                    }
                </ul>
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

export default Book;