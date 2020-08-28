import axios from 'axios';

export default {

  register( userData ) {

    return axios.post('/api/register', userData);

  },

  login( userData ) {

    return axios.post('/api/login', userData);

  },

  authenticated() {

    return axios.post('/api/authenticated');

  }

}