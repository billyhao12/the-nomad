const db = require('../models')

module.exports = {
  findAll: function(req, res) {
    db.Comment
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findById: function(req, res) {
    db.Comment.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {

    console.log(`comment create req: ${req.body}`);

    db.Comment.create({ ...req.body, user: req.user._id })
      .then((dbModel) => {
        console.log('first then');
        db.User.updateOne({_id: req.user._id}, {
          $push: { comments: dbModel._id },
        })
          .then((dbModel) => {
            console.log('second then');
            db.Article.updateOne({_id: dbModel.article}, {$push: {comments: dbModel._id}})
          })
          .then(() =>{console.log('third then'); res.json(dbModel)})
      })
      .catch((err) => res.status(422).json(err));

  },
  update: function(req, res){
    db.Comment
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  remove: function(req, res){
    db.Comment
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}