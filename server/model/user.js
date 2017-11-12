var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  password: String
});
mongoose.model('user', UserSchema);

module.exports = mongoose.model('user');