import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import propTypes from 'prop-types';
import './style.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNqbTA5MyIsImEiOiJja2VkZHFsMjIwMnRrMnBud2J3YXVxcHJpIn0.8YUfTVkZw7oNUmkrJikDkQ';

function Map(props){
  const [state, setState] = useState({lng: 5, lat: 34, zoom: 2});

  const mapContainerRef = useRef()

  useEffect(() => {
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [state.lng, state.lat],
      zoom: state.zoom
    });
    map.on('move', () => {
      setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    console.log(props.coordinates)
  
  },[props.coordinates] )


  return(
    <div>
      <div className='sidebarStyle'>
        <div>Longitude: {state.lng} | Latitude: {state.lat} | Zoom: {state.zoom}</div>
      </div>
      <div ref={mapContainerRef} className='mapContainer' />
    </div>
  )
}
Map.propTypes={
  coordinates: propTypes.array
}

export default Map;