import axios from 'axios';

export default {

  getArticles() {
    return axios.get('/api/articles');
  },

  getArticle( id ) {
    return axios.get('/api/articles/' + id);
  },

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