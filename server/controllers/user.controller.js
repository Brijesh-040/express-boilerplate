'use strict'

const UserModel = require("../model/user.model");
const bcrypt = require('bcryptjs');
const token = require('../utils/create-token');
const generalHelper = require('../utils/helperFunctions')
const cloudinaryHelper = require('../utils/cloudinaryHelper')

// signUp user
const signUp = async (req, res) => {
    const { body } = req;
    try {
        let signUpData = await UserModel.find({
            $or: [{ email: body.email }, { userName: body.userName }],
        });
        if (signUpData.length && signUpData) {
            res.status(400).send("userName or email is all ready Exists.....!");
        } else {
            const user = await UserModel.create(body);
            if (user) {
                res.status(201).json({
                    status: 'success',
                    message: 'Congratulations, your account has been successfully created.',
                })
            } else {
                res.status(400).send("Unable to create user. Please double-check your details and try again.");
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// sigIn user
const signIn = async (req, res) => {
    const { body } = req;
    try {
        const getUser = await UserModel.findOne({
            $or: [{ userName: body.userName }, { email: body.userName }],
        });
        if (getUser != null) {
            if (
                getUser.userName == body.userName ||
                getUser.email == body.userName
            ) {
                const isMatch = await bcrypt.compare(
                    body.password,
                    getUser.password,
                );
                if (isMatch) {
                    const credentailsToken = token(getUser, "730h");
                    res.status(200).json({
                        message: 'Login Sucessfull!🎉',
                        token: credentailsToken,
                        user: getUser,
                    });
                } else {
                    res.status(400).send("Password is not Valid!!☢");
                }
            }
        } else {
            res.status(400).send("User Details is not Valid!!!");
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get All users
const getAll = async (req, res) => {
    const { query } = req;
    try {
        if (query.isActive == 'true') {
            const users = await UserModel.find({ isActive: query.isActive, isDeleted: false })
            res.json(users);
        } else {
            const users = await UserModel.find({ isDeleted: false })
            res.json(users);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// get user Details
const getUser = async (req, res) => {
    const { auth } = req;
    try {
        const user = await UserModel.findById(auth.user._id, { _id: 0, createdAt: 0, updatedAt: 0, isDeleted: 0, isActive: 0, password: 0 })
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ message: "user not found." })
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateUser = async (req, res) => {
    const { body, auth } = req;
    try {
        const user = await UserModel.findById(auth.user._id)
        if (user) {
            await UserModel.findByIdAndUpdate(auth.user._id, body)
            res.status(200).json({ message: "user has been successfully updated." })
        } else {
            res.status(400).json({ message: "user not found." })
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// user Activate
const activateUser = async (req, res) => {
    const { body } = req;
    try {
        if (body.userId) {
            const user = await UserModel.findByIdAndUpdate(body.userId, { $set: { isActive: true } })
            if (user) {
                res.status(200).json({ message: "user has been successfully activated." });
            } else {
                res.status(400).json({ message: "user not found." })
            }
        } else {
            res.status(422).json({ message: 'Validation error - Missing userId' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// change user password
const changePassword = async (req, res) => {
    const { body, auth } = req;
    try {
        if (body.password === body.newpassword) {
            res.status(400).json({ message: "password and new password can not same." })
        }
        if (body.newPassword === body.confirmPassword) {
            const user = await UserModel.findById(auth.user._id)
            if (user) {
                if (body.newPassword === user.oldPassword) {
                    res.status(400).json({ message: "The new password must be different from the old one." })
                }
                const isMatch = await bcrypt.compare(
                    body.password,
                    user.password,
                );
                if (isMatch) {
                    const { hash } = await generalHelper.generateHash(body.newPassword);
                    user.password = hash;
                    user.oldPassword = body.password
                    user.save();
                    res.status(200).json({ message: "user password has been successfully changed." })
                } else {
                    res.status(400).json({ message: "password does not match" })
                }
            } else {
                res.status(400).json({ message: "user not found." })
            }
        } else {
            res.status(400).json({ message: "new password and confirmation password do not match." })
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// upload profile image
const uploadImage = async (req, res) => {
    const { file, auth } = req;
    try {
        let upload = await cloudinaryHelper.fileUpload(file);
        if (upload.success) {
            const user = await UserModel.findById(auth.user._id);
            if (user.image && user.image.fileName) {
                await cloudinaryHelper.deleteFile(user.image.fileName)
            }
            user.image = upload;
            user.save();
            res.status(200).json({ message: "Profile Image has been successfully update." })
        } else {
            res.send(400).json({ message: "Failed to update profile image. Please try again later." })
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    signUp,
    signIn,
    getUser,
    updateUser,
    uploadImage,
    getAll,
    activateUser,
    changePassword
}