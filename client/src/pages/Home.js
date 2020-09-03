import React, { useEffect, useState} from 'react';

import ArticlePreview from '../components/ArticlePreview';
import Map from '../components/Map';
import Categories from '../components/Categories';
import api from '../utils/api';
import propTypes from 'prop-types';
// import {Feature} from 'react-mapbox-gl';

function Home(){
  const [articles, setArticles] = useState([]);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    loadArticles()
    loadPosition()
  },[])
  
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

  console.log(`Position lat: ${position.latitude}`);
  console.log(`Position long: ${position.longitude}`);

  const articlesCoordinates= articles.map((article) => (
    {
      lat: article.lat,
      long: article.long,
      id: article._id
    }
  ))
 
  //User GPS location
 
  console.log(articlesCoordinates)
  
  return (
    <div>
      <Map coordinates= {articlesCoordinates} />

      <Categories />

      {/** Start with a basic list of cards */}
      {
        articles.map((article, index) => (
          // eslint-disable-next-line react/jsx-key
          <ArticlePreview article={article} key={index}/>

        ))

      }
              
    </div>
  )}

Home.propTypes = {
  children: propTypes.node,
};


export default Home; 
