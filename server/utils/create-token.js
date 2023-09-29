'use strict'

const Jwt = require('jsonwebtoken')
// const errorHelper = require('./error-helper')

function createToken(user, expirationPeriod) {
  try {
    let token = {}

    const tokenUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id
    }

    token = Jwt.sign(
      {
        user: tokenUser
      },
      "b-mart-authorizeuser",
      {
        algorithm: 'HS256',
        expiresIn: expirationPeriod
      }
    )

    return token
  } catch (err) {
    console.log('err: ', err);
    // errorHelper.handleError(err)
  }
}

module.exports = createToken