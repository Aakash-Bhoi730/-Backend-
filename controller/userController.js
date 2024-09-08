const User = require("../models/userModel");

const index = (req, res) => {
  User.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: " An error Occured: " + error,
      });
    });
};

const show = (req, res) => {
  User.findById(req.params.id)
    .then((userDetails) => {
      res.json({
        data: userDetails,
      });
    })
    .catch((error) => {
      res.json({
        message: " An error Occured: " + error,
      });
    });
};

const add = (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  user
    .save()
    .then((response) => {
      res.json({
        message: "user added successfully",
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        message: " An error Occured: " + error,
      });
    });
};
const update = (req, res) => {
  let updateId = req.params.id;
  let updateData = {
    name: req.body.name,
    email: req.body.email,
  };
  User.findByIdAndUpdate(updateId, { $set: updateData })
    .then((response) => {
      res.json({
        data: response,
        message: "User Updated Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
        error,
      });
    });
};
const destroy = (req, res) => {
  User.findOneAndDelete(req.params.id)
    .then((response) => {
      res.json({
        message: "User Deleted Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
        error,
      });
    });
};

module.exports = {
  index,
  show,
  add,
  update,
  destroy,
};
