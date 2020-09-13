import React from 'react';
import { Footer, Container, Content } from 'react-bulma-components';
import './style.css';

function BottomFooter() {

  return (
    <Footer>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <p>
            <strong>The Nomad</strong> was developed by Trenton Creamer, Heather Empson, Billy Hao, Christopher Marti and Anthony Smith. The source code is licensed <a href="https://github.com/billyhao12/the-nomad/blob/master/LICENSE">MIT</a>.
          </p>
        </Content>
      </Container>
    </Footer>
  )

}

export default BottomFooter;