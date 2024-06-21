'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;
const modelName = 'users';
const generalHelper = require('../utils/helperFunctions')

const userSchema = new Schema(
  {
    firstName: {
      type: Types.String,
      required: true,
    },
    lastName: {
      type: Types.String,
      required: true,
    },
    // image: {
    //   type: Types.Mixed,
    //   default: null
    // },
    userName: {
      type: Types.String,
      required: true,
    },
    email: {
      type: Types.String,
      required: true,
    },
    mobileNo: {
      type: Types.String,
      default: null
    },
    address: {
      type: Types.String,
      default: null
    },
    password: {
      type: Types.String,
      required: true,
    },
    role: {
      type: Types.String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isActive: {
      type: Types.Boolean,
      default: true
    },
    isDeleted: {
      type: Types.Boolean,
      default: false
    },
    oldPassword: {
      type: Types.String,
      default: null
    }
  },
  {
    collection: modelName,
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!!user.password && user.isNew) {
    const passHash = await generalHelper.generateHash(user.password);
    user.password = passHash.hash;
    user.wasNew = true;
  }
  if (!!user.email) {
    user.email = user.email.toLowerCase().trim();
    user.userName = user.userName.trim();
  }
  next()
})

module.exports = mongoose.model(modelName, userSchema);
