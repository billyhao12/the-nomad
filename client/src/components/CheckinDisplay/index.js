import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import PropTypes from 'prop-types';
import { Card, Media, Content, Image } from 'react-bulma-components';


function CheckinDisplay(props) {
  const [location, setLocation] = useState();

  useEffect(() => {
    loadCheckin(props.checkInId)
  },[]);
  console.log(location)
  function loadCheckin(id) {
    api.getCheckIn(id)
      .then(res =>
        setLocation(res.data)
      )
      .catch(err=> console.log(err))
  }
  if(location){
    return (
      <Card>
        <Card.Content>
          <Media>
            <Media.Item renderAs="figure" position="left">
              <Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
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
  checkInId: PropTypes.object
};

export default CheckinDisplay;