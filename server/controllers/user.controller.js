'use strict'

const UserModel = require("../model/user.model");
const bcrypt = require('bcryptjs');
const token = require('../utils/create-token');

// Get All users
const getUsers = async (req, res) => {
    const { body, params, auth, query } = req;
    try {
        if (query.userId) {
            const users = await UserModel.findById(query.userId)
            res.json(users);
        } else {
            const users = await UserModel.find({})
            res.json(users);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

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
            if(user) {
                res.json({
                    statusCode: 201,
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
}

// sigIn user
const signIn = async (req, res) => {
    const { body } = req;
    try {
        const getUser = await UserModel.findOne({
            $or: [{ userName: body.email }, { email: body.email }],
        });
        if (getUser != null) {
            if (
                getUser.userName == body.email ||
                getUser.email == body.email
            ) {
                const isMatch = await bcrypt.compare(
                    body.password,
                    getUser.password,
                );
                if (isMatch) {
                    const credentailsToken = token(getUser, "730h");
                    res.json({
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
}

module.exports = {
    signUp,
    getUsers,
    signIn
}