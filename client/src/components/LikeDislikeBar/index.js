import React, {useEffect, useState} from 'react';
import {useStoreContext} from '../../store';

import {Button, Progress, Level } from 'react-bulma-components';

import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../utils/api';
const QueryString = require('querystring');

function LikeDislikeBar(props) {
  const [{userAuth}] = useStoreContext();  
  const [{likes, dislikes}, setFavor] = useState({likes: props.likes, dislikes: props.dislikes});

  useEffect(() => {
    assignFavor(props.likes, props.dislikes);
  },[props.likes, props.dislikes]);

  function assignFavor(propLikes, propDislikes) {
    setFavor({likes: propLikes, dislikes: propDislikes});
  }
  
  const [user, setUser] = useState();

  useEffect(() => {
    if(userAuth) {
      getUser();
    }
  },[userAuth]);


  function getUser() {
    api.getUser(userAuth.id)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }

  const [isLiked, setLiked] = useState(null);

  useEffect(() => {
    if(user)
      if(user.likedArticles)
        getLiked(user.likedArticles);
  },[userAuth, isLiked])

  function getLiked(articles) {
    function checkArticles(article) {
      return article.articleId === props.articleId;
    }

    const articlesIndex = articles.findIndex(checkArticles);
    if(articlesIndex !== -1)
      setLiked(articles[articlesIndex].value);
  }

  function getIsLiked() {
    function checkArticles(article) {
      return article.articleId === props.articleId;
    }

    console.log('inside getisliked');
    if(user) {
      console.log('user', user);
      if(user.likedArticles){
        console.log('inside if');
        const articlesIndex = user.likedArticles.findIndex(checkArticles);
        if(articlesIndex !== -1) {
          console.log(`returning: ${user.likedArticles[articlesIndex].value}`)
          return user.likedArticles[articlesIndex].value;
        } else {
          console.log('returning null');
          return null;
        }
      }
    }
  }

  function handleLike() {

    if(isLiked !== null)
    {
      if(isLiked) {
        //do api stuff to remove the like that is there already
        api.updateLikedArticles(QueryString.stringify({id: user._id, articleId: props.articleId, todo: 'remove'}))
        //set isliked to null
        setLiked(null);
        // decrement likes
        props.onLike(likes - 1, dislikes)
        setFavor({likes: likes - 1, dislikes: dislikes});
      } else {
        //do api stuff to change the value from true to false
        api.updateLikedArticles(QueryString.stringify({id: user._id, articleId: props.articleId, todo: 'swapValue', value: !isLiked}))
        //set isliked to false
        setLiked(false)
        // decrement dislikes
        // increment likes
        props.onLike(likes + 1, dislikes - 1)
        setFavor({likes: likes + 1, dislikes: dislikes - 1})
      }
    } else {
      //api call to create the new entry with the value of true
      api.updateLikedArticles(QueryString.stringify({id: user._id, articleId: props.articleId, todo: 'create', value: true}))
      setLiked(true);
      props.onLike(likes + 1, dislikes)
      setFavor({likes: likes + 1, dislikes: dislikes});
    }
  }

  function handleDislike() {
    if(isLiked !== null) {
      if(!isLiked) {
        
        //do api stuff to remove the dislike already there
        api.updateLikedArticles(QueryString.stringify({id: user._id, articleId: props.articleId, todo: 'remove'}))
        //set isliked to null
        setLiked(null);
        //decrement dislikes
        props.onLike(likes, dislikes - 1)
        setFavor({likes: likes, dislikes: dislikes - 1});
      } else {
        //do api stuff to change the value from false to true
        api.updateLikedArticles(QueryString.stringify({id: user._id, articleId: props.articleId, todo: 'swapValue', value: !isLiked}))
        //set isliked to true
        setLiked(true);
        // increment dislikes
        // decrement likes
        props.onLike(likes - 1, dislikes + 1)
        setFavor({likes: likes - 1, dislikes: dislikes + 1})
      }
    } else {
      //api call to create the new entry with value of false
      api.updateLikedArticles(QueryString.stringify({id: user._id, articleId: props.articleId, todo: 'create', value: false}))
      setLiked(false);
      props.onLike(likes, dislikes + 1)
      setFavor({likes: likes, dislikes: dislikes + 1})
    }

    
  }

  if(user) {
    console.log('inside user');
    let liked = getIsLiked();
    return (
      <Level.Item>
        <Level.Item>
          <Button fullwidth onClick={handleLike} color={liked===true ? 'success' : ''}>
            <FontAwesomeIcon icon="arrow-up" />
          </Button>
        </Level.Item>
  
        <Level.Item>
          <Progress
            style={{width: '10em'}}
            max={likes + dislikes}
            value={likes}
            color='primary'
            size='large'
          />
        </Level.Item>
        <Level.Item>
          <Button fullwidth onClick={handleDislike} color={liked===false ? 'danger' : ''}>
            <FontAwesomeIcon icon="arrow-down" />
          </Button>
        </Level.Item>
  
      </Level.Item>
      
    );
  } else {
    return (
      <Level.Item>
        <Level.Item>
          <Button fullwidth onClick={handleLike}>
            <FontAwesomeIcon icon="arrow-up" />
          </Button>
        </Level.Item>
    
        <Level.Item>
          <Progress
            style={{width: '10em'}}
            max={likes + dislikes}
            value={likes}
            color='primary'
            size='large'
          />
        </Level.Item>
        <Level.Item>
          <Button fullwidth onClick={handleDislike}>
            <FontAwesomeIcon icon="arrow-down" />
          </Button>
        </Level.Item>
    
      </Level.Item>
    );
  }  
}

LikeDislikeBar.propTypes = {
  likes: propTypes.number,
  dislikes: propTypes.number,
  articleId: propTypes.string,
  onLike: propTypes.func,
}

export default LikeDislikeBar;

/** 
 * 
 * Logic
 * 
 * check if the user's ID is in like or dislikes (api call)
 *   If in like
 *    set the like button to green
 *   Else if in dis
 *    set the dislike button to red
 *   Else
 *    both buttons are regular grey
 * 
 * (This I think can be in this component *_1)   
 * onLike
 *  If - the user already activated
 *    unactivate (api call)
 *  Else if - the user has the other activated
 *    unactivate the other, activate the other (two api calls?)
 *  Else
 *    activate (api call)
 * 
 *   progress bar = like over dislike = % filled (like = green, dislike = red)
 * 
 *  
*/ 