import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import BooksList from "./components/books-list.component";
import EditBooks from "./components/edit-books.component";
import CreateBooks from "./components/create-books.component";

function App() {
  return (
    <>
    <Router>
      <div className="container">
      <Navbar />
      <br />
      <Route path="/" exact component = {BooksList} />
      <Route path="/edit/:id"  component = {EditBooks} />
      <Route path="/create"  component = {CreateBooks} />
      </div>
    </Router>
    </>
  );
}

export default App;
