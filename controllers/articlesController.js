const db = require('../models');
const QueryString = require('querystring');

module.exports = {
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.user._id);
    db.Article.create({...req.body, user: req.user._id} )
      .then((dbModel) => {
        db.User.updateOne({_id: req.user._id}, {$push: {articles: dbModel._id}})
          .then(()=> res.json(dbModel));
      })
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Article.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByCategoryArray: function(req, res) {
    const {array} = QueryString.parse(req.params.categories);
    console.log(array);
    db.Article
      .find({category: { $in: [...array]}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findByCategorySingle: function(req, res) {
    db.Article
      .find({category: [req.params.category]})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findByTitle: function(req, res) {
    db.Article
      .find({
        title: {
          $regex: req.params.title, 
          $options: 'i'}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  setFavor: function(req, res) {
    console.log(req.params.values)
    const values = QueryString.parse(req.params.values);
    console.log('inside setFavor with values: likes: ' + values.likes + ' dislikes: ' + values.dislikes);
    db.Article.updateOne({_id: values.articleId}, {$set: {likes: values.likes, dislikes: values.dislikes}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
};
//5f5d99213d932f7da01f245c