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
    
    if(pageNum === numPages && pageRemainder) {
      numToDisplay = pageRemainder;
    }

    for(let i = 0; i < numToDisplay; i++) {
      newPageToDisplay.push(relatedArticles[(page * numRelatedToDisplay)  + i]);
    }

    setDisplay([...newPageToDisplay]);
  }

  if(relatedArticles.length > 0) {
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
        <p>Pending Related Articles</p>
      </div>
    );
  }
}

export default Related;