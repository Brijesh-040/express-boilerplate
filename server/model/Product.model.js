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
    name: {
      type: Types.String,
      default: null
    },
    price: {
      type: Types.Number,
      required: true,
    },
    image: {
      type: Types.Mixed,
      default: null
    },
    description: {
      type: Types.String,
      default: null
    },
    quantity: {
      type: Types.Number,
      default: null
    },
    discount: {
      type: Types.Number,
      default: 0
    }
  },
  {
    collection: modelName,
    timestamps: true,
    versionKey: false
  }
);

productSchema.pre('save', async function (next) {
  const product = this;
  if(product.brand) {
    product.brand = product.brand.toUpperCase()
  }
  next()
})

module.exports = mongoose.model(modelName, productSchema);
