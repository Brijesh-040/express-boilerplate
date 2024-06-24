'use strict'

const router = require("express").Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.get("/user", authenticateToken, userController.getUser);
router.put("/update", authenticateToken, userController.updateUser);
router.put("/changePassword", authenticateToken, userController.changePassword);
router.get("/getAll", authenticateToken, authorizeRole(['admin']), userController.getAll);
router.put("/activate", authenticateToken, authorizeRole(['admin']), userController.activateUser);

module.exports = router;