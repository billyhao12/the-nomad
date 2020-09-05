import React, {useState}from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bulma-components';
import {Button} from 'react-bulma-components';
import {Section} from 'react-bulma-components';



function UserCheckIn(props) {
  console.log(props)
  const[modalState, setModalState] = useState({show: false})
  
  function open(){  setModalState({ show: true })}
  function close() { setModalState({ show: false })}

  return (
    <div>
      <Button onClick={open}>Open</Button>
      <Modal show={modalState.show} onClose={close}>
        <Modal.Content>
          <Section style={{ backgroundColor: 'white' }}>
          Make two buttons, one for checkin, one for creating an article!
          </Section>
        </Modal.Content>
      </Modal>
    </div>
  );
}

UserCheckIn.propTypes = {
  modal: PropTypes.object,
  children: PropTypes.node.isRequired,
}
export default UserCheckIn;