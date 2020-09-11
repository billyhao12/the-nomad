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
    db.Comment.create({ ...req.body, user: req.user._id})
      .then((dbModel) => {
<<<<<<< HEAD
        db.User.findOneAndUpdate(req.user._id, {
          $push: { comments: dbModel._id },
        }).then(() => res.json(dbModel))
=======
        db.Article.updateOne({_id: dbModel.article}, {$push: {comments: dbModel._id}})
          .then(() => {
            db.User.updateOne({_id: req.user._id}, {$push: {comments: dbModel._id}})
              .then(() => res.json(dbModel));
          })
>>>>>>> 5c08781f523f91d2ccb29698821a43e4d9dd0728
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