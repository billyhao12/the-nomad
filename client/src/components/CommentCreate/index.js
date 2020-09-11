import React, {useState} from 'react';

import {Box, Container, Form, Button} from 'react-bulma-components';
import api from '../../utils/api';

function CommentCreate(props) {

  const [comment, setComment] = useState();

  function handleInputChange(e) {
    const value = e.target.value;

    console.log(value);

    setComment(value);
  }

  function handleFormSubmit(e) {
    //api.
  }

  return (
    <Container>
      <Box>
        <Form.Field>
          <Form.Label>Comment</Form.Label>
          <Form.Control>
            <Form.Textarea placeholder="Enter your comment" onChange={handleInputChange} value={comment}/>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Button type='primary' onClick={handleFormSubmit}>Submit</Button>
          </Form.Control>
        </Form.Field>
      </Box>
    </Container>
  );
}

export default CommentCreate;