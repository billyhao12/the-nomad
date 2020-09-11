import React, {useState}from 'react';
import PropTypes from 'prop-types';
import {Container, Section, Button, Modal} from 'react-bulma-components';
import './style.css';
import API from '../../utils/api';

function UserCheckIn(props) {
  
  const[modalState, setModalState] = useState({show: false});
  const[successState, setSuccessState] =useState({show: false});

  function open(){  setModalState({ show: true })}
  function close() { setModalState({ show: false })}
  
  function success(){ setSuccessState({ show: true }) }
  function closeSuccess(){ setSuccessState({ show: false })}

  function storeCoordinates( event ){
    event.preventDefault();
    API.createCheckIn({
      lat: props.userLatitude,
      long: props.userLongitude,
      date: Date.now
    })
      .then(() => close())
      .then(success)
      .then(setTimeout(closeSuccess, 2000))
      .catch( err => console.log(err))
  }

  return (
    <div>
      <Container className='checkinContainer has-text-centered '>
        <Button className='is-large checkinButton' color='danger' onClick={open}>Check In!</Button>
      </Container>
      <Modal show={modalState.show} onClose={close}>
        <Modal.Content>
          <Section >
            <Container className='has-text-centered'>
              <Button onClick={storeCoordinates} className='is-large' rounded={true} color='success'>Save Location for Later</Button>
              <a href='/createArticle' className='is-success is-large is-rounded button'>Write Article Now</a>
            </Container>
          </Section>
        </Modal.Content>
      </Modal>
      <Modal show={successState.show} >
        <Modal.Content>
          <Section style={{backgroundColor: 'yellow'}}>
            <Container className='has-text-centered'>
              <p className='successMessage'>Location successfully stored!</p>
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