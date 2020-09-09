import React, {useState}from 'react';
import PropTypes from 'prop-types';
import {Container, Section, Button, Modal} from 'react-bulma-components';
import './style.css';
import API from '../../utils/api'



function UserCheckIn(props) {
  
  const[modalState, setModalState] = useState({show: false})
  
  const checkinCoordinates = [props.userLongitude, props.userLatitude];
 
  function open(){  setModalState({ show: true })}
  function close() { setModalState({ show: false })}

  function storeCoordinates(){
    console.log(checkinCoordinates);
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
    </div>
  );
}

UserCheckIn.propTypes = {
  userLongitude: PropTypes.number,
  userLatitude: PropTypes.number
}

export default UserCheckIn;