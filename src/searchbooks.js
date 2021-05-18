import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './book';

class SearchBooks extends Component {
    state = {
        query: '',
        books: [],
        error: false,
    }
    updateQuery = (e) => {
        const query = e.target.value

        this.setState(() => ({
            query: query,
        }), () => {
            if (this.state.query === '') {
                this.setState(() => ({ books: [], error: false }))
            } else {
                this.searchBooks(this.state.query)
            }
        })
    }
    searchBooks = (query) => {
        BooksAPI.search(query).then((res) => {
            if (res.error) {
                this.setState(() => ({
                    error: true,
                }))
            }
            else {
                this.setState(() => ({
                    books: [...res],
                    error: false,
                }))
            }
        })
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(e) => this.updateQuery(e)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <div id={(this.state.error) ? 'hide' : 'show'}>
                        <ol className="books-grid">
                            {
                                this.state.books.length > 0 &&
                                this.state.books.map((book) => (book.imageLinks && <Book
                                    book={book} key={book.id}
                                    updateBook={this.props.updateBook}
                                />))}
                        </ol>
                    </div>
                    <div id={(this.state.error) ? 'show' : 'hide'} className='error'>No Books Found</div>
                </div>
            </div>
        )
    }

}
export default SearchBooks