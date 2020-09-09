import axios from 'axios';

export default {
  getComments() {
    return axios.get('/api/comments');
  },
  createComment(data) {
    return axios.post('/api/comments', data);
  },
  getComment(id) {
    return axios.get('/api/comments/' + id);
  },
  updateComment(id, data) {
    return axios.put('/api/comments/' + id, data);
  },
  deleteComment(id) {
    return axios.delete('/api/comments/' + id);
  },

  createCheckIn(data) {
    return axios.post('/api/checkin', data);
  },

  getCheckIn(id) {
    return axios.get('/api/checkin/' + id);
  },

  deleteCheckIn(id) {
    return axios.delete('/api/checkin/' + id);
  },

  getArticles() {
    return axios.get('/api/articles');
  },

  getArticle(id) {
    return axios.get('/api/articles/' + id);
  },

  getArticleCat(cat) {
    return axios.get('/api/articles/category/' + cat);
  },

  createArticle(data) {
    return axios.post('/api/articles', data);
  },

  getUser(id) {
    return axios.get('/api/profiles/' + id);
  },

  register(userData) {
    return axios.post('/api/register', userData);
  },

  login(userData) {
    return axios.post('/api/login', userData);
  },

  authenticated() {
    return axios.post('/api/authenticated');
  },
};