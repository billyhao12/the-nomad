import React, {useEffect, useState} from 'react';
import {useStoreContext} from '../../store';

import './style.css'
import {Button, Progress, Level } from 'react-bulma-components';

import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function LikeDislikeBar(props) {
  const [{userAuth}] = useStoreContext();  
  const [{likes, dislikes}, setFavor] = useState(0,0);

  useEffect(() => {
    assignFavor(props.favor);
  }, []);

  function assignFavor(favor) {
    if(favor) {
      for(let v of favor.values()) {
        if(v)
          setFavor({likes: likes+1});
        else
          setFavor({dislikes: dislikes+1});
      }
    }
  }

  const [isLiked, setLiked] = useState(null);

  useEffect(() => {
    if(userAuth) {
      if(props.favor) {
        const liked = props.favor.get(`${userAuth._id}`);
        if(liked !== null) {
          setLiked(liked);
        }
      }
    }
  },[userAuth]);

  function handleLike() {
    console.log('handleLike clicked');
  }

  function handleDislike() {
    console.log('handleDislike clicked');
  }

  if(isLiked);

  return (
    <Level.Item>

      <Level.Item>
        <Button fullwidth onClick={handleLike}>
          <FontAwesomeIcon icon="arrow-up" />
        </Button>
      </Level.Item>

      <Level.Item>
        <Progress style={{width: '10em'}} max={100} value={15} color='primary' background-color='danger' size='large'/>
      </Level.Item>

      <Level.Item>
        <Button fullwidth onClick={handleDislike}>
          <FontAwesomeIcon icon="arrow-down" />
        </Button>
      </Level.Item>

    </Level.Item>
    
  );
}

LikeDislikeBar.propTypes = {
  favor: propTypes.object,
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