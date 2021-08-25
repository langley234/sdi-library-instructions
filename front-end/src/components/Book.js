import React from 'react';

class Book extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data === undefined) {
            return (
                <div>Error Loading Book Data. Please Retry</div>
            );
        } else {
            return (
                <div>Book Placeholder Text</div>
            );
        }
    }
}

export default Book;