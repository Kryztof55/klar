const path = require("path");
const router = require("express").Router();

let Record = require("../models/record.model");

router.route("/").get((req, res) => {
  Record.find()
    .then((record) => res.json(record))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res, next) => {
  const name = req.body.name;
  const number = Number(req.body.number);
  const mail = req.body.mail;
  const birthday = req.body.birthday;
  const avatar = req.body.avatar;

  const newRecord = new Record({
    name,
    number,
    mail,
    birthday,
    avatar,
  });

  newRecord
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Record.findById(req.params.id)
    .then((record) => res.json(record))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Record.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").patch((req, res) => {
  Record.findById(req.params.id)
    .then((record) => {
      record.name = req.body.name;
      record.number = Number(req.body.number);
      record.mail = req.body.mail;
      record.avatar = req.body.avatar;

      record
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
