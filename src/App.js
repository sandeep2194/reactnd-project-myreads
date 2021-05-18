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

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState(() => ({
      books: books,
    }))
  }
  updateBook = (book, shelfName) => {
    const currentBook = this.state.books.find((b) => b.id === book.id);

    if (currentBook) {
      this.setState((oldState) => {
        currentBook.shelf = shelfName
        let newBooks = oldState.books.filter((b) => b.id !== book.id)
        return { books: [...newBooks, currentBook] }
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
            <SearchBooks books={this.state.books} updateBook={this.updateBook} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
