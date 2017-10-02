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
        books: response.data,
        yeti: 'WHITE',
        biggz: 'brown'
      });
    });
  }

  // Add code here to get all books from the database and save them to this.state.books

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title (required)" />
              <Input name="author" placeholder="Author (required)" />
              <TextArea name="synopsis" placeholder="Synopsis (Optional)" />
              <FormBtn>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Books On My {this.state.yeti} List</h1>
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
