const { Schema, model } = require('mongoose');

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
    // subscription: {
    //   type: String,
    //   enum: ['starter', 'pro', 'business'],
    //   default: 'starter',
    // },
    // token: String,
  },
  { versionKey: false, timestamps: true }
);
const User = model('user', userSchema);

module.exports = User;
