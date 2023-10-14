const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    name: {
      type: String,
      require: [true, 'Please Inter Name'],
    },
    email: {
      type: String,
      require: [true, 'Please Inter Email'],
    },
    phone: {
      type: String,
      require: [true, 'Please Inter Phone'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
