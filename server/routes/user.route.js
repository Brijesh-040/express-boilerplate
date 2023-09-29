'use strict'

const router = require("express").Router();
const userController = require('../controllers/user.controller');
const jwtMiddleware = require('../middleware/authMiddleware');

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.get("/users", jwtMiddleware, userController.getUsers);

module.exports = router;