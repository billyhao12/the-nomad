const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db.Checkin
      .find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err))
  },
  create: function(req, res) {
    db.Checkin.create({ ...req.body, user: req.user._id })
      .then(dbModel => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Checkin
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}