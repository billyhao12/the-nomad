const db = require('../models')
const QueryString = require('querystring');

module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findById: function(req, res) {
    db.User
      .findById({ _id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  updateLikedArticles: function(req, res) {
    const request = QueryString.parse(req.params.articles);

    if(request.todo === 'remove') {
      db.User.updateOne({_id: request.id}, {$pull: {likedArticles: {articleId: request.articleId}}})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else if(request.todo === 'swapValue') {
      db.User.updateOne({_id: request.id}, {$pull: {likedArticles: {articleId: request.articleId}}})
        .then(db.User.updateOne({_id: request.id}, {$push: {likedArticles: {articleId: request.articleId, value: request.value}}})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
        );
    } else {
      db.User.updateOne({_id: request.id}, {$push: {likedArticles: {articleId: request.articleId, value: request.value}}})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  }
}