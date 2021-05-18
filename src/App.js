import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './listbooks';
import SearchBooks from './searchbooks';


class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      this.setState(() => ({
        books: res,
      }))
    })
  }
  updateBook = (book, shelfName, index) => {
    const currentBook = this.state.books.find((b) => b.id === book.id);

    if (currentBook) {
      this.setState((oldState) => {
        oldState.books[index].shelf = shelfName
        return { books: [...oldState.books] }
      })
    } else {
      book.shelf = shelfName
      this.setState((oldState) => ({
        books: [...oldState.books, book]
      }))
    }

    BooksAPI.update(book, shelfName)

  }
  render() {
    return (
      <div className="app">
        <Route
          exact
          path='/'
          render={() => (
            <ListBooks books={this.state.books} updateBook={this.updateBook} />
          )}
        />

        <Route
          path='/search'
          render={() => (
            <SearchBooks book={this.state.books} updateBook={this.updateBook} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
