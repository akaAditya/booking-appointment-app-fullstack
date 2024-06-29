const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Handle POST request
router.post("/", userController.createUser);

// Handle GET request
router.get("/", userController.getAllUsers);

// Handle DELETE request
router.delete("/:id", userController.deleteUser);

// Handle PUT request
router.put("/:id", userController.updateUser);

module.exports = router;
