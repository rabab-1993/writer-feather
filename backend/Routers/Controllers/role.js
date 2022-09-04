const rolModel = require("../../db/model/role");
// creat new role function
const creatRole = (req ,res) => {
    const {role, permissions} = req.body;
    const newRole = new rolModel({
      role,
      permissions,
    });

    newRole
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get all role function
const allRole = (req, res) => {
    rolModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}




module.exports = { creatRole, allRole };