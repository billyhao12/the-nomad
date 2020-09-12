import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import { Card, Media, Content } from 'react-bulma-components';
import Minimap from '../Minimap';


function CheckinDisplay(props) {
  const [location, setLocation] = useState();

  useEffect(() => {
    loadCheckin(props.checkInId)
  },[props]);

  function loadCheckin(id) {
    api.getCheckIn(id)
      .then(res =>
        setLocation(res.data)
      )
      .catch(err=> console.log(err))
  }

  if(location){
    const checkInGeoJSON = {
      'type': 'FeatureCollection',
      'features':{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [location.long, location.lat, 0],
        },
        'properties': {
          'title': 'Check In'
        }
      }
    }
    return (
      <Card>
        <Card.Content>
          <Media>
            <Media.Item renderAs="figure" position="left">
              <Minimap 
                checkInCoordinates={checkInGeoJSON} 
              />
            </Media.Item>
            <Content>
              <p> <strong>Location</strong> Latitude: {location.lat}  Longitude: {location.long}</p>
            </Content>
          </Media>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item renderAs="a" href="#Yes">Write Article?</Card.Footer.Item>
        </Card.Footer>
      </Card>
    )
  } else {
    return(
      <p>Check-in to a location to write an article later!</p>
    )
  }
}

CheckinDisplay.propTypes = {
  checkInId: PropTypes.string
};

export default CheckinDisplay;