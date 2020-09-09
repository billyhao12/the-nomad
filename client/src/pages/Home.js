import React, { useEffect, useState} from 'react';

import ArticlePreview from '../components/ArticlePreview';
import Map from '../components/Map';
import Categories from '../components/Categories';
import api from '../utils/api';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UserCheckIn from '../components/UserCheckIn';

import { Columns } from 'react-bulma-components';

function Home() {
  const [articles, setArticles] = useState([]);
  const [position, setPosition] = useState([]);
  const history = useHistory();

  useEffect(() => {
    loadArticles()
    loadPosition()
  },[]);

  function loadArticles() {
    api.getArticles()
      .then(res =>
        setArticles(res.data)
      )
      .catch(err => console.log(err));
  }
  
  function loadPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position);
    }
  
    function position(pos) {
      setPosition({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
    }
  }

  //constructed React router url link to article from mapbox popup
  window.goToArticle = (event, articleId) =>{
    event.preventDefault()
    history.push(`/article/${articleId}`)
  }

  //Article Feature portion of GeoJSON obj
  const articlesCoordinates= articles.map((article) => (
    { 'type': 'Feature',
      'properties': {
        'id': article._id,
        'details': '<strong><a href="#" onclick="goToArticle(event,\''+ article._id +'\')">'+ article.title + '</strong><br><img src="'+ article.image +'" width="100">'
      },
      'geometry':
      {
        'type': 'Point',
        'coordinates': [article.long, article.lat, 0],
      }
    }
  ))
  
  return (

    <div>
    
      <UserCheckIn 
        userLatitude={position.latitude}
        userLongitude={position.longitude}
      />
    
      <Map 
        userLatitude={position.latitude}
        userLongitude={position.longitude}
        articlesCoordinates={articlesCoordinates}
      />


      <Columns>
    
        <Columns.Column size={3}>
          <Categories />
        </Columns.Column>
    
        <Columns.Column size={9}>
          {
            articles.map((article, index) => (
              // eslint-disable-next-line react/jsx-key
              <ArticlePreview article={article} key={index}/>
            ))
          }
        </Columns.Column>

      </Columns>

    </div>

  )
  
}

Home.propTypes = {
  children: propTypes.node,
}

export default Home;
