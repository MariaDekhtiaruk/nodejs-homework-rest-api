const { Schema, model, Types } = require('mongoose');
const { SUBSCRIPTION_TYPES } = require('../constants/constants');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      // minLength спробувати прописати
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      // match спробувати прописати
    },

    contacts: {
      type: [Types.ObjectId],
      ref: 'contact',
    },
    subscription: {
      type: String,
      enum: SUBSCRIPTION_TYPES,
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);
const User = model('user', userSchema);

module.exports = User;
