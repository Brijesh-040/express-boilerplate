const joi = require('joi')

const signupSchema = joi.object({
    userName: joi.string().label("userName"),
    email: joi.string().email().label('Email'),
    firstName: joi.string().label("First Name"),
    lastName: joi.string().label("Last Name"),
    mobileNo: joi.string().length(10).label('Mobile No'),
    address: joi.string().label("Address"),
    password: joi.string().min(8).label('Password'),
    role: joi.string().allow('', null).label("Role")
});

const signinSchema = joi.object({
    userName: joi.string().label("Email address or userName"),
    password: joi.string().min(8).label('password'),
});

const uploadImage = joi.object({
    image: joi.string().label('image')
})

module.exports = {
    signupSchema,
    signinSchema,
    uploadImage
};
