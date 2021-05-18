import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './bookshelf';

function ListBooks(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf
                        title='Currently Reading'
                        books={props.books.filter((book) => (book.shelf === 'currentlyReading'))}
                        updateBook={props.updateBook}
                    />
                    <BookShelf
                        title='Want to Read'
                        books={props.books.filter((book) => (book.shelf === 'wantToRead'))}
                        updateBook={props.updateBook}
                    />
                    <BookShelf
                        title='Read'
                        books={props.books.filter((book) => (book.shelf === 'read'))}
                        updateBook={props.updateBook}
                    />
                </div>
            </div>
            <div className="open-search">
                <Link
                    to='/search'
                >
                    Add a book
                </Link>
            </div>
        </div>
    )
}

export default ListBooks