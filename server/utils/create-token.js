'use strict'

const Jwt = require('jsonwebtoken')
// const errorHelper = require('./error-helper')

function createToken(user, expirationPeriod = '24h') {
  try {
    let token = {}

    const tokenUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      _id: user._id
    }

    token = Jwt.sign(
      {
        user: tokenUser
      },
      'boilerplate-authorizeuser',
      {
        algorithm: 'HS256',
        expiresIn: expirationPeriod
      }
    )

    return token
  } catch (err) {
    console.log('err: ', err);
    throw err
  }
}

module.exports = createToken