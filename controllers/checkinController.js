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
        db.User.updateOne({ _id: req.user._id }, { $push: { checkIns: dbModel._id } }
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
      .findByIdAndDelete(req.params.id)
      .then((dbModel) => {
        db.User.updateOne({ _id: dbModel.user }, { $pull: { checkIns: dbModel._id } }
        ).then(() => res.json(dbModel));
      })
      .catch(err => console.log(err))
  }
}