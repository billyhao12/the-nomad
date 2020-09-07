import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ArticlePreview from '../ArticlePreview';


Related.propTypes = {
  articles: PropTypes.array,
  thisArticleId: PropTypes.string
};

const numRelatedToDisplay = 5;

function Related(props) {

  console.log('related props: ', props);
  const relatedArticles = props.articles.filter(article => article._id !== props.thisArticleId);
  let relatedArticlesToDisplay = [];

  // function getRelatedToDisplay() {
  for(let i = 0; i < numRelatedToDisplay; i++) {
    relatedArticlesToDisplay.push(relatedArticles[i]);
    console.log('push');
  }
  // }

  // if(relatedArticlesToDisplay > 0) {
  //   console.log('if relatedArticlesToDisplay: ', relatedArticlesToDisplay)
  //   return (
  //     <div>
  //       {
  //         relatedArticlesToDisplay.map((related, index) => (
  //           <ArticlePreview article={related} key={index} />
  //         ))
  //       }
  //     </div>
  //   );
  // }
  // else {
  //   console.log('inside related else: ', relatedArticlesToDisplay);
  //   return(<p>stupid</p>);
  // }


  console.log('thing before render ran');

  console.log('Related Articles before render: ', relatedArticles);
  console.log('relatatedArticlesToDisplay before render: ', relatedArticlesToDisplay);

  console.log('relatedArticlesToDisplay.length: ', relatedArticlesToDisplay.length);

  if(relatedArticlesToDisplay.length > 0) {
    return (
      <div>
        { console.log('if render ran') }
        {relatedArticlesToDisplay.map((article, index) => (
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