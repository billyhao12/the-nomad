/* eslint-disable no-unused-vars */
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Card from 'react-bootstrap/Card';
// import ReactMapboxGl, {Layer} from 'react-mapbox-gl';
// import {Feature} from 'react-mapbox-gl';
import api from '../utils/api';
import {Container, Image, Box, Hero, Heading, Tile, Level, Content, Media} from 'react-bulma-components';
import PropTypes from 'prop-types';

import Related from '../components/Related';
import CommentCreate from '../components/CommentCreate';
import CommentView from '../components/CommentView';
import LikeDislikeBar from '../components/LikeDislikeBar';
const QueryString = require('querystring');

ArticleDetailView.propTypes = {
  location: PropTypes.object,
  pathname: PropTypes.string,
}

function ArticleDetailView(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    
  })

  const [{articleLikes, articleDislikes}, setLikes] = useState({articleLikes: 0, articleDislikes: 0});

  useEffect(() => {

  })

  const [article, setArticle] = useState();

  const pathname = props.location.pathname;

  const articleid = pathname.split('/');

  const idString = articleid[2];

  useEffect(() => {
    loadArticle(idString)
  }, [idString]);

  function loadArticle(id) {
    if(id) {
      api.getArticle(id)
        .then(res =>{
  
          setArticle(res.data);
          setComments(res.data.comments);
          setLikes({articleLikes: res.data.likes, articleDislikes: res.data.dislikes});
        })
        .catch(err => console.log(err));
    }
    else {
      console.log(`id: ${id}`)
    }
  }
  
  const [related, setRelated] = useState([]);

  useEffect(() => {
    getArticleCategories(article)
  }, [article])

  function getArticleCategories(art) {
    if(art) {
      //console.log(`query string: ${QueryString.stringify({array: [...art.category]})}`)

      if(art.category.length === 1) {
        api.getArticleCategoriesSingle(art.category[0])
          .then(res => {
            setRelated(res.data);
          })
          .catch(err => console.log(err));
      }
      else if(art.category.length >= 1) {
        api.getArticleCategoriesArray(QueryString.stringify({array: [...art.category]}))
          .then(res => {
            setRelated(res.data);
            //console.log('res: ', res);
          })
          .catch(err => console.log(err));
      }
      else {
        console.log('no related categories found');
      }
    }
  }

  function handleNewComment(commentId) {
    const oldComments = comments;
    console.log('new comment:commentId', commentId);
    setComments(oldComments.concat([commentId]));
  }

  function handleLike(numLikes, numDislikes) {
    //api call to update the new number of likes and dislikes
    console.log(`inside handle likes with values: likes:${numLikes} dislikes:${numDislikes}`);
    api.updateFavor(QueryString.stringify({likes: numLikes, dislikes: numDislikes, articleId: idString}))
      .then(() => {
        //set the values of likes and dislikes
        setLikes({articleLikes: numLikes, articleDislikes: numDislikes});
  
      })
      .catch(err => console.log(err));
  }

  if(article)
  {
    let date = article.date;
    if(date) {
      date = article.date.split('T')
      date = date[0];
    } else {
      date = 'no date';
    }

    console.log('rendering article: ', article);

    return (
      <div>
        <Tile kind="ancestor">
          <Tile size={9} vertical>
            <Tile>
              <Tile kind="parent">
                <Tile renderAs="article" kind="child">
                  <Container>
                    <Hero style={{textAlign: 'center'}} color={colors.light}>
                      <Hero.Body>
                        <Heading>

                          {article.title}
                        </Heading>
                      </Hero.Body>
                    </Hero>
                    <Image src={article.image} />
                    <Box>
                      <Box>
                        <Level renderAs="nav">
                          
                          <Level.Item>
                            <Heading size={5} subtitle>
                            Categories: 
                            </Heading>
                            {
                              article.category.map((category, index) => (
                                <Level.Item renderAs="button" key={index}>
                                  <Link to='/'>{category}</Link>
                                </Level.Item>
                              ))
                            }
                          </Level.Item>

                          {/* <LikeDislikeBar likes={articleLikes} dislikes={articleDislikes} articleId={article._id} onLike={handleLike}/> */}

                          <Level.Item><Heading size={5} subtitle><strong>Published: </strong>{date}</Heading></Level.Item>
                          <Level.Item><Heading size={5} subtitle><strong>Lat: </strong>{article.lat}</Heading></Level.Item>
                          <Level.Item><Heading size={5} subtitle><strong>Long: </strong>{article.long}</Heading></Level.Item>
                        
                        </Level>
                      </Box>
                      
                      <Content>
                        {article.body}
                      </Content>
                    </Box>
                  </Container>
                </Tile>
              </Tile>
              
            </Tile>
            <Tile kind="parent">
              <Tile renderAs="article" kind="child">
                <Container>
                  <Box>
                    <Heading subtitle><strong><big>Comments</big></strong></Heading>
                    {comments.length > 0 &&
                        comments.map((comment, index) => (
                          <CommentView commentId={comment} key={index} />
                        ))
                    }
                    <Media>
                      <Media.Item>
                        <CommentCreate articleId={article._id} onComment={handleNewComment}/>    
                      </Media.Item>
                    </Media>
                  </Box>
                </Container>
              </Tile>
            </Tile>
          </Tile>
          <Tile kind="parent">
            <Tile renderAs="article" kind="child" >
              <Container>
                <Box>
                  <div className="content">
                    <Heading subtitle>Related</Heading>

                    { related.length > 0 &&
                      <div>
                        <Related articles={related} thisArticleId={idString} />
                      </div>
                    }

                    <div className="content" />
                  </div>
                </Box>
              </Container>
            </Tile>
          </Tile>
        </Tile>

      </div>
    );
  }
  return (
    <div>
      
      <p>ArticleDetailView</p>
    </div>
  );
  
}
export default ArticleDetailView;

const colors = {
  Default: '',
  primary: 'primary',
  info: 'info',
  danger: 'danger',
  warning: 'warning',
  success: 'success',
  white: 'white',
  black: 'black',
  light: 'light',
  dark: 'dark',
  link: 'link',
};