import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import propTypes from 'prop-types';
import './style.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNqbTA5MyIsImEiOiJja2VkZHFsMjIwMnRrMnBud2J3YXVxcHJpIn0.8YUfTVkZw7oNUmkrJikDkQ';

function Map(props){
  

  let articlesCoordinates = [props.articlesCoordinates]

  console.log(articlesCoordinates);
  const [state, setState] = useState({lng: -122.51, lat: 47.62, zoom: 7.89});
 
  const mapContainerRef = useRef()

  useEffect(() =>{
    if(!props.userLatitude){
      return
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [props.userLongitude, props.userLatitude],
      zoom: 8
    });

  
    map.on('load',  function() { 

      new mapboxgl.Marker()
        .setLngLat({lon: props.userLongitude, lat: props.userLatitude})
        .addTo(map)
    });


    map.on('move', () => {
      setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

  },[props])


  return(
    <div className="map_box_container">
      <div ref={mapContainerRef} className='mapContainer' />
      <div className='sidebarStyle'>
        <div>Longitude: {state.lng} | Latitude: {state.lat} | Zoom: {state.zoom}</div>
      </div>
    
    </div>
  )
}
Map.propTypes={
  articlesCoordinates: propTypes.array,
  userLongitude: propTypes.number,
  userLatitude: propTypes.number
}

export default Map;