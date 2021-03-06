import React, {useState}from 'react';
import PropTypes from 'prop-types';
import {Container, Section, Button, Modal} from 'react-bulma-components';
import './style.css';
import API from '../../utils/api';
const QueryString = require('querystring');
const  {useIsAuthenticated} = require('../../utils/auth');
function UserCheckIn(props) {
  
  const[successState, setSuccessState] = useState({show: false});
  const[failState, setFailState]= useState({show: false})
  
  function success(){ setSuccessState({ show: true }) }
  function closeSuccess(){ setSuccessState({ show: false })}

  function failModal(){ setFailState({ show: true }) }
  function closeFailModal(){ setFailState({ show: false })}

  function storeCoordinates( event ){
    event.preventDefault();
    API.createCheckIn({
      lat: props.userLatitude,
      long: props.userLongitude,
      date: Date.now
    })
      .then(success)
      .then(setTimeout(closeSuccess, 2000))
      .catch( err => {if(err){
        failModal()
      }})
  }
  //if user is authenticated, then they can write an article
  const isAuthorizedUser = useIsAuthenticated();
  let button;
  if(isAuthorizedUser){
    button = <a href={`/createArticle/${QueryString.stringify({lat:props.userLatitude, long: props.userLongitude})}`} className='is-success is-large is-rounded button'>Write Article Now</a>
  } else {
    button = <Button onClick={()=>failModal()} className='is-large' rounded={true} color='success'>Write Article</Button>
  }

  return (
    <div>
      <Container className='checkinContainer mt-1 has-text-centered '>
        <Button onClick={storeCoordinates} className='is-large' rounded={true} color='success'>Save Location for Later</Button>
        {button}      
      </Container>
      <Modal show={successState.show} >
        <Modal.Content>
          <Section style={{backgroundColor: '#0C516E'}}>
            <Container className='has-text-centered'>
              <p className='alertMessage has-text-light'>Location successfully stored!</p>
            </Container>
          </Section>
        </Modal.Content>
      </Modal>
      <Modal show={failState.show} onClose={closeFailModal}>
        <Modal.Content>
          <Section style={{backgroundColor: '#0C516E'}}>
            <Container className='has-text-centered '>
              <p className='alertMessage has-text-light'>Create an account or log in!</p>
              <a className='button is-success is-inverted' href="/login">Login</a><a className='button ml-2 is-primary is-inverted' href="/register">Register</a>
            </Container>
          </Section>
        </Modal.Content>
      </Modal>
    </div>
  );
}

UserCheckIn.propTypes = {
  userLongitude: PropTypes.number,
  userLatitude: PropTypes.number
}

export default UserCheckIn;