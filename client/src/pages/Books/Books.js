import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from '../../utils/API'

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: []
  };

  // THIS IS WHY REACT LOOKS SO DAMN FAST!! :D Because we are rendering html via js and
  // Doing this API call before page is even displayed. Woo!
  // componentWillMount is an ability inherited from Component

  componentWillMount() {
    API.getBooks().then((response) => {
      this.setState({
        books: response.data
      });
    });
  }

  // Add code here to get all books from the database and save them to this.state.books

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {

    const book = {
      title: this.state.title,
      author: this.state.author
    };
    // this.books.push(book);
    API.saveBook(book);

    // this.books.push(book);
    //
    // this.setState({
    //   books: this.books
    // });

  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>

            </Jumbotron>
              <h1>Number of Books Read... {this.state.books.length}</h1>
            <form>
              <Input name="title" onChange={this.handleInputChange} placeholder="Title (required)" />
              <Input name="author" onChange={this.handleInputChange} placeholder="Author (required)" />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" />
              <FormBtn onClick={this.handleFormSubmit} >Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
