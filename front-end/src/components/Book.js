import React from 'react';

class Book extends React.Component {
    constructor(props) {
        super(props);
    }

    translateCheckedInStatus = (booler) => {
        if (booler === true) return 'Not Available';
        if (booler === false) return 'Available';
    }

    render() {
        if (this.props.data === undefined) {
            return (
                <div>Error Loading Book Data. Please Retry</div>
            );
        } else {
            return (
                <ul>
                    <li>{`Title ${this.props.data.title}`}</li>
                    <li>{`Author : ${this.props.data.author}`}</li>
                    <li>{`ISBN : ${this.props.data.isbn}`}</li>
                    <li>{`Checked Out Status : ${this.translateCheckedInStatus(this.props.data[`checked-in`])}`}</li>
                    {
                        this.props.data['checked-in'] ?
                        <button>Check Out</button> :
                        <div>Not Available to Check Out</div>
                    }
                </ul>
            );
        }
    }
}

export default Book;