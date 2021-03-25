import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => (
  <tr>
    <td>{props.book.title}</td>
    <td>{props.book.isbn}</td>
    <td>{props.book.author}</td>
    <td>{props.book.annotation}</td>
    <td>
      <Link to={"/edit/"+props.book._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteBook(props.book._id) }}>Delete</a>
    </td>
  </tr>
)

export default class BooksList extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this)

    this.state = {
        books: []
    };
  }

  

  componentDidMount() {
    axios.get('http://localhost:5000/books/')
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteBook(id) {
    axios.delete('http://localhost:5000/books/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      books: this.state.books.filter(el => el._id !== id)
    })
  }

  bookList() {
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} deleteBook={this.deleteBook} key={currentbook._id}/>;
    })
  }

  
  filterContent(books,searchTerm){
      const result=books.filter((book)=>book.title.includes(searchTerm));
      this.setState({books:result});
  }

  handleTextSearch =(e) =>{
      const searchTerm=e.currentTarget.value;
      axios.get('http://localhost:5000/books/').then((res) =>
      {
          if(res.data.success) {
              this.filterContent(res.data.books,searchTerm)
          }
          
      })
     
  }

  render() {
    return (
      <div>
        <h3>All Books</h3>
        <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
                
            </div>
            <div className="col-lg-3 mt-2 mb-2">
                <input
                className="form-control"
                type="search"
                placeholder="Search"
                name="searchTerm"
                onChange={this.handleTextSearch}
                ></input>
            </div>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>ISBN</th>
              <th>Author</th>
              <th>Annotation</th>
              
            </tr>
          </thead>
          <tbody>
            { this.bookList() }
          </tbody>
        </table>
      </div>
    )
  }
}