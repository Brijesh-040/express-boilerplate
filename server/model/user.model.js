'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = Schema.Types
const modelName = 'users'

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
      type: Types.Number,
      default: null
    },
    address: {
      type: Types.String,
      default: null
    },
    password: {
      type: Types.String,
      required: true,
    }
  },
  {
    collection: modelName,
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model(modelName, userSchema);
