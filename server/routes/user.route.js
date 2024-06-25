'use strict'

const router = require("express").Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/multerMiddleware')
const { signupSchema, signinSchema, uploadImage } = require('../validators/user.validator')
const validate = require('../middleware/validationMiddleware');

router.post("/signUp", validate(signupSchema, 'body'), userController.signUp);
router.post("/signIn", validate(signinSchema, 'body'), userController.signIn);
router.get("/user", authenticateToken, userController.getUser);
router.put("/update", authenticateToken, userController.updateUser);
router.put("/uploadImage", validate(uploadImage, 'body'), authenticateToken, upload.single('image'), userController.uploadImage);
router.put("/changePassword", authenticateToken, userController.changePassword);
router.get("/getAll", authenticateToken, authorizeRole(['admin']), userController.getAll);
router.put("/activate", authenticateToken, authorizeRole(['admin']), userController.activateUser);

module.exports = router;