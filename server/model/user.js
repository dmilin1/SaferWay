var { mongoose } = require('./../mongoose/mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: (value => {
                return validator.isEmail(value);
            }),
            messsage: `Not a valid email address type`
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            },
            access: {
                type: String,
                required: true
            }
        }
    ]
});
//Pre
//mongoose pre is run before we update a model.
UserSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if(hash){
                    user.password = hash;
                }
                next();
            })
        });
    } else{
        next();
    }
});
// User instance methods
UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(), access}, 'secretkey',
    {expiresIn: '60'}).toString();
    user.tokens = user.tokens.concat ([{token,access}]);

    return user.save().then(()=>{
        return token;
    });
};

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['_id','email','password']);
}

// User static methods
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token,'secretkey');
    } catch (err) {
        return Promise.reject();
    }

    return User.findById({_id:decoded._id});
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    
    User.findOne({email}).then(user=>{
        if(!user){
            return Promise.reject();
        }else{
            return new Promise((resolve,reject)=>{
                bcrypt.compare(password,user.password, (err,result)=>{
                    if(result){
                        console.log(result);
                        resolve(result);
                    }else{
                        reject(err);
                    }
                });
            });
        }
    });
};

UserSchema.methods.removeToken = function(token){
    var user = this;

    return user.update({
        $pull:{
            tokens:{token}
        }
    });
}
var user = mongoose.model('User', UserSchema);

module.exports = user;