import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import './style.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNqbTA5MyIsImEiOiJja2VkZHFsMjIwMnRrMnBud2J3YXVxcHJpIn0.8YUfTVkZw7oNUmkrJikDkQ';

function Minimap (props){
 
  const minimapContainerRef = useRef();
  
  useEffect(() =>{

    const map = new mapboxgl.Map({
      container: minimapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: props.checkInCoordinates.features.geometry.coordinates,
      zoom: 17
    });
    
    new mapboxgl.Marker()
      .setLngLat({lon: props.checkInCoordinates.features.geometry.coordinates[0], lat: props.checkInCoordinates.features.geometry.coordinates[1]})
      .addTo(map);

  }, [props]);

  return(
    <div className="map_box_container">
      <div ref={minimapContainerRef} className='minimapContainer' id='map' />
    </div>
  )

}

Minimap.propTypes = {
  checkInCoordinates: PropTypes.object
};
export default Minimap;