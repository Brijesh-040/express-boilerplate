'use strict'

const router = require("express").Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.get("/user", authenticateToken, userController.getUser);
router.put("/update", authenticateToken, userController.updateUser);
router.put("/changePassword", authenticateToken, userController.changePassword);
router.get("/getAll", authenticateToken, authorizeAdmin, userController.getAll);
router.put("/activate", authenticateToken, authorizeAdmin, userController.activateUser);

module.exports = router;