import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import { Card, Media, Content } from 'react-bulma-components';
import Minimap from '../Minimap';
import {Link} from 'react-router-dom';
const QueryString = require('querystring');

function CheckinDisplay(props) {
  const [location, setLocation] = useState();
  console.log(props.checkInId)
  useEffect(() => {
    loadCheckin(props.checkInId)
  },[props]);
console.log(props)
  function loadCheckin(id) {
    console.log(id)
    api.getCheckIn(id)
      .then(res =>
        setLocation(res.data)
      )
      .catch(err=> console.log(err))
  }

  function deleteCheckin() {
    api.deleteCheckIn(props.checkInId)
      .then(props.loadUser)
      .catch(err => console.log(err))
  }

  console.log(location)
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
          <Card.Footer.Item>
          <Link to={{pathname:`/createArticle/${QueryString.stringify({lat:location.lat, long: location.long, date: location.date})}`}}>Write Article Now?</Link>

          </Card.Footer.Item>
          <Card.Footer.Item renderAs="button" className="button is-danger" onClick={deleteCheckin}>Remove Check-in?</Card.Footer.Item>
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