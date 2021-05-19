import React from 'react'
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './listbooks';
import SearchBooks from './searchbooks';
import FourZeroFour from './404';

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


  updateBook = async (book, shelfName) => {
    try {
      book.shelf = shelfName;
      const found = this.state.books.find((b) => b.id === book.id);
      await BooksAPI.update(book, shelfName);
      this.setState((oldState) => ({
        books: found
          ? [...oldState.books.filter(({ id }) => id !== book.id), book] // here I used destructure
          : oldState.books.concat(book), // and here I used concat(), concat() appends to the end of the array.
      }));
    } catch (error) {
      console.log("updateBook Error:", error);
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
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
          <Route component={FourZeroFour} />
        </Switch>

      </div>
    )
  }
}

export default BooksApp
