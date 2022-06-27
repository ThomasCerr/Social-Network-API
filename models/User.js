const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { isEmail } = require('validator');

const UserSchema = new Schema(
{
username:{
    type: String,
    unique: true,
    trim: true,
    required: true
    
},

email:{
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate: [isEmail, 'Please fill a valid email address'],
},

thoughts: [
    {
        type:Schema.Types.ObjectId,
        ref:'Thought'
    }
],
friends: [
    {
        type:Schema.Types.ObjectId,
        ref:'User'
    }
]
}  ,
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

  const User = model('User', UserSchema);

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

module.exports = User;