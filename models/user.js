const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String, unique: true, lowercase: true, required: true,
  },
  password: {
    type: String,
  },
  profile: {
    name: String,
    photo: String,
    phonenumber: String,
  },
  address: {
    city: String,
    area: String,
    estate: String,
    street: String,
    apartment: String,
    landmark: String,
  }
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  if (user.password) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next();
        user.password = hash;
        next(err);
      });
    });
  }
});


/* compare password in the database and the one that the user type in*/
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.gravatar = function(size) {
  if (!this.size) size = 190;
  if (!this.email)  {
    return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  } else {
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
  }
}

module.exports = mongoose.model('User', UserSchema);
