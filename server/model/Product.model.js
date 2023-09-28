const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = Schema.Types
const modelName = 'products'

const productSchema = new Schema(
  {
    brand: {
      type: Types.String,
      required: true,
    },
    price: {
      type: Types.Number,
      required: true,
    },
    image: {
      type: Types.Mixed,
      default: null
    },
    name: {
      type: Types.String,
      default: null
    },
    description: {
      type: Types.String,
      default: null
    },
    firstname: {
      type: Types.String,
      default: null
    },
    lastname: {
      type: Types.String,
      default: null
    },
    mobileno: {
      type: Types.String,
      default: null
    },
    address: {
      type: Types.String,
      default: null
    },
    create: {
      type: Types.Number,
      default: null
    }
  },
  {
    collection: modelName,
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model(modelName, productSchema);
