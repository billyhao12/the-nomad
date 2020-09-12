import React, { useState } from 'react';
import propTypes from 'prop-types';

import api from '../../utils/api';

import { Form, Button } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Field, Control, Input } = Form;

function SearchForm({ setArticles }) {

  const [searchInput, setSearchInput] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    api.searchArticleTitles(searchInput)
      .then(result =>
        setArticles(result.data.map( item => ({
          title: item.title,
          image: item.image,
          byline: item.byline,
          category: item.category,
          date: item.date,
          like: item.like,
          dislike: item.dislike,
          lat: item.lat,
          long: item.long,
          user: item.user,
          id: item._id
        })))
      )
      .catch(err => console.log(err));
  }

  return (
    <Field className="has-addons">
      <Control className="is-expanded">
        <Input
          className="is-info is-fullwidth"
          placeholder="Search by Title"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </Control>
      <Control>
        <Button 
          className="is-info"
          type="primary"
          onClick={handleSubmit}>
          <FontAwesomeIcon icon="search" />
        </Button>
      </Control>
    </Field>

  )
}

SearchForm.propTypes = {
  setArticles: propTypes.func
}

export default SearchForm;