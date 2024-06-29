const User = require("../models/userModel");

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    console.log(name, email, phone, "name, email, phone");
    const data = await User.create({ name, email, phone });
    res.status(201).json({ newUserDetail: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    console.log(req.body, "req.body");
    const user = await User.findByPk(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.phone = phone;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
