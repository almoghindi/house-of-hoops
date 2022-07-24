const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  cart: [{
    productId: { type: Schema.Types.ObjectId, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true},
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true }
  }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
