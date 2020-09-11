const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db.CheckIn
      .find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err))
  },
  create: function(req, res) {
    db.CheckIn.create({ ...req.body, user: req.user._id })
      .then((dbModel) => {
<<<<<<< HEAD
        db.User.updateOne({ _id: req.user._id }, { $push: { checkIn: dbModel._id } }
=======
        db.User.updateOne({ _id: req.user._id }, { $push: { checkIns: dbModel._id } }
>>>>>>> 5c08781f523f91d2ccb29698821a43e4d9dd0728
        ).then(() => res.json(dbModel));
      })
      .catch((err) => res.status(422).json(err));
  }, 
  findById: function (req, res) {
    db.CheckIn.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err))
  },
  remove: function(req, res) {
    db.CheckIn
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}