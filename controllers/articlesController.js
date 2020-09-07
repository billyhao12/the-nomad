const db = require('../models')

module.exports = {
  findAll: function(req, res) {
    console.log(req);
    console.log(req.query);
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    console.log(req.body);
    console.log(req.user._id);
    db.Article.create({...req.body, user: req.user._id} )
      .then(dbModel => res.json(dbModel))
      // .then((dbModel) => {
      //   db.User.findOneAndUpdate(req.user._id, {$push: {articles: dbModel._id}})
      //     .then(()=> res.json(dbModel));
      // })
      .catch((err) => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel=> res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findByCat: function(req, res) {
    console.log('findByCat: ', req.params);
    db.Article
      .find({category: [req.params.cat]})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  
}