const Bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid')

const generateHash = async (key) => {
  try {
    if (key === undefined || key === '') {
      console.log('key: ', key);
      key = uuidv4()
    }
    const salt = await Bcrypt.genSalt(10)
    const hash = await Bcrypt.hash(key, salt)
    return {
      key,
      hash
    }
  } catch (err) {
    throw err
  }
}

module.exports = {
  generateHash
};