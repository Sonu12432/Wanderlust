const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose);  // we plugined the passportLocalMongoose because it automaticaly adds the userName and password(hash and salt) to our schema or db so we don't need to built them from scratch

const User = mongoose.model("User", userSchema);

module.exports = User;