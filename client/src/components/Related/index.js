import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import ArticlePreview from '../ArticlePreview';
import { Button } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


Related.propTypes = {
  articles: PropTypes.array,
  thisArticleId: PropTypes.string
};

const numRelatedToDisplay = 5;

function Related(props) {
  const relatedArticles = props.articles.filter(article => article._id !== props.thisArticleId);
  const numPages = Math.floor(parseInt(relatedArticles.length) / parseInt(numRelatedToDisplay));
  const pageRemainder = parseInt(relatedArticles.length) % parseInt(numRelatedToDisplay);

  
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    setPageToDisplay(page);
  }, [page]);
  
  const [pageToDisplay, setDisplay] = useState([]);

  // useEffect(() => {

  // });

  console.log('numPages: ', numPages);
  console.log('pageRemainder: ', pageRemainder);

  function handleLeft() {
    if(page > 0) {
      setPage(page - 1);
    }
  }

  function handleRight() {
    if(page + 1 <= numPages) {
      setPage(page + 1);
    }
  }

  function setPageToDisplay(pageNum) {
    let newPageToDisplay = [];
    let numToDisplay = numRelatedToDisplay;
    
    console.log('current page: ', pageNum);
    console.log('numToDisplay: ', numToDisplay);
    
    if(pageNum === numPages && pageRemainder) {
      numToDisplay = pageRemainder;
    }

    for(let i = 0; i < numToDisplay; i++) {
      newPageToDisplay.push(relatedArticles[(page * numRelatedToDisplay)  + i]);
    }

    console.log('newPageToDisplay: ', newPageToDisplay);
    setDisplay([...newPageToDisplay]);
  }

  if(relatedArticles.length > 0) {
    console.log('pageToDisplay: ', pageToDisplay);

    return (
      <div>

        <Button.Group>
          <Button renderAs='span' onClick={handleLeft}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <Button renderAs='span' onClick={handleRight}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Button.Group>

        { console.log('if render ran') }
        {
          pageToDisplay.map((article, index) => (
            <ArticlePreview article={article} key={index} />
          ))
        }
      </div>
    )
  }
  else {
    return (
      <div>
        {console.log('else render ran')}
        <p>Pending Related Articles</p>
      </div>
    );
  }
}

export default Related;