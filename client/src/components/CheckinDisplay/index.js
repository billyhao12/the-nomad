import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import { Card, Media, Content, Button } from 'react-bulma-components';
import Minimap from '../Minimap';
import {Link} from 'react-router-dom';
import './style.css'
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
    let date = location.date;
    if(date) {
      date = location.date.split('T')
      date = date[0]
    } else {
      date = 'no date';
    }


    return (
      <Card className='checkinCard'>
        <Card.Content>
          <Media>
            <Media.Item renderAs="figure" position="left">
              <Minimap 
                checkInCoordinates={checkInGeoJSON} 
              />
            </Media.Item>
            <Media.Item>
              <Content className='coords'>
                <p> <span className='location'>Location:</span> Latitude: {location.lat}  Longitude: {location.long} <span className='location'>Date:</span> {date}</p>
              </Content>
            </Media.Item>
          </Media>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
            <Link className='button is-success writeButton' to={{pathname:`/createArticle/${QueryString.stringify({lat:location.lat, long: location.long, date: location.date})}`}}>Write Article Now?
            </Link>
          </Card.Footer.Item>
          <Card.Footer.Item>
            <Button className="is-danger" onClick={deleteCheckin}>Remove Check-in?
            </Button>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    )
  } else {
    return(
      <p>Check in error!</p>
    )
  }
}

CheckinDisplay.propTypes = {
  checkInId: PropTypes.string
};

export default CheckinDisplay;