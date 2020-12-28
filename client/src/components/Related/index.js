import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import ArticlePreviewGrid from '../ArticlePreviewGrid';
import { Button, Tile } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


Related.propTypes = {
  articles: PropTypes.array,
  thisArticleId: PropTypes.string
};

const numRelatedToDisplay = 3;

function Related(props) {
  const relatedArticles = props.articles.filter(article => article._id !== props.thisArticleId);
  const numPages = Math.floor(parseInt(relatedArticles.length) / parseInt(numRelatedToDisplay));
  const pageRemainder = parseInt(relatedArticles.length) % parseInt(numRelatedToDisplay);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    setPageToDisplay(page);
 
  }, [page]);
  
  const [pageToDisplay, setDisplay] = useState([]);
  const [leftButtonDisabled, setLeft] = useState(true);
  const [rightButtonDisabled, setRight] = useState(true);

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

    if(page > 0) {
      setLeft (false);
    }
    else setLeft (true);

    if(page < numPages || (page < numPages && pageRemainder > 0)) {
      setRight(false);
    }
    else if(page === numPages)
      setRight(true);
    else setRight(true);

    setDisplay([...newPageToDisplay]);
  }

  if(relatedArticles.length > 0) {
    
    return (
      <div>

        <Button.Group>
          <Button renderAs='span' onClick={handleLeft} disabled={leftButtonDisabled}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <Button renderAs='span' onClick={handleRight} disabled={rightButtonDisabled}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Button.Group>
        <Tile kind='ancestor'>
          {
            pageToDisplay.map((article, index) => (
              <ArticlePreviewGrid article={article} key={index} />
            ))
          }
        </Tile>
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