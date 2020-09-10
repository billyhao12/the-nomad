import React, { useEffect, useState } from 'react';

import propTypes from 'prop-types';
import api from '../../utils/api';
import ArticlePreview from '../ArticlePreview';

function UserArticle(props) {
  const [ article, setArticle ] = useState();

  useEffect(() => {
    loadArticle(props.articleId);
  },[]);

  function loadArticle(id) {
    api.getArticle(id)
      .then(res =>
        setArticle(res.data)
      )
      .catch(err => console.log(err));
  }

  if(article) {
    return (
      <ArticlePreview article={article} />
    );
  }
  else {
    return <p>User Article</p>;
  }
}



export default UserArticle;

UserArticle.propTypes = {
  articleId: propTypes.string
};