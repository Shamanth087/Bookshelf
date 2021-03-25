import React, { Component } from 'react';
import axios from 'axios';


export default class EditBooks extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeISBN = this.onChangeISBN.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeAnnotation = this.onChangeAnnotation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        title: '',
        isbn: '',
        author: '',
        annotation:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/books/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          isbn: response.data.isbn,
          author: response.data.author,
          annotation: response.data.annotation,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeISBN(e) {
    this.setState({
      isbn: e.target.value
    })
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    })
  }

  onChangeAnnotation(e) {
    this.setState({
      annotation: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const book = {
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      annotation: this.state.annotation
    }

    console.log(book);

    axios.post('http://localhost:5000/books/update/' + this.props.match.params.id, book)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Book</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}>
             
          </input>
        </div>
        <div className="form-group"> 
          <label>ISBN: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.isbn}
              onChange={this.onChangeISBN}
              />
        </div>
        <div className="form-group">
          <label>Author: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
              />
        </div>
        <div className="form-group">
          <label>Annotation: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.annotation}
              onChange={this.onChangeAnnotation}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Book" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}