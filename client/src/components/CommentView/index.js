import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';

import { Media, Content, Level} from 'react-bulma-components';

import api from '../../utils/api';
import LikeDislikeBar from '../LikeDislikeBar';


function CommentView(props) {

  const [comment, setComment] = useState();
  const [user, setUser] = useState();


  useEffect(() => {
    getComment(props.commentId);
  },[]);

  function loadUser(comment) {
    if (comment) {
      api.getUser(comment.user)
        .then(res=> {
          setUser(res.data)
          setComment(comment)} )
        .catch(err => console.log(err))
    }
  }

  function getComment(id) {
    api.getComment(id)
      .then(res => {
        loadUser(res.data);
      })
  }

  function handleLike() {

  }

  if(comment) {
    return (
      <Media>
        <Media.Item>
          <Content>
            <p>
              <strong>{user.name} says:</strong> <small>Commented: {comment.date}</small>
              <br />
              {comment.content}
            </p>
          </Content>
          <Level breakpoint='mobile'>
            <Level.Side align='left'>
              <LikeDislikeBar favor={comment.favor} onLike={handleLike} />
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