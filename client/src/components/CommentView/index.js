import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';

import { Media, Content, Level, Button} from 'react-bulma-components';

import api from '../../utils/api';


function CommentView(props) {

  const [comment, setComment] = useState();
  const [user, setUser] = useState();


  useEffect(() => {
    getComment(props.commentId);
  },[]);

  function loadUser(comment) {
    api.getUser(comment.user)
      .then(res=> {
        setUser(res.data)
        setComment(comment)} )
      .catch(err => console.log(err))
  }

  function getComment(id) {
    api.getComment(id)
      .then(res => {
        loadUser(res.data);
      })
  }



  if(comment) {
    return (
      <Media>
        <Media.Item>
          <Content>
            <p>
              <strong>{user.name}</strong> <small>Commented: {comment.date}</small>
              <br />
              {comment.content}
            </p>
          </Content>
          <Level breakpoint='mobile'>
            <Level.Side align='left'>
              <Button>Like</Button> +{comment.like.length}
              <Button>Dislike</Button> -{comment.dislike.length}
            </Level.Side>
          </Level>
        </Media.Item>
      </Media>
    );
  } else {
    return(
      <p>comment view</p>
    );
  }
}

CommentView.propTypes = {
  commentId: propTypes.string,
}

export default CommentView;