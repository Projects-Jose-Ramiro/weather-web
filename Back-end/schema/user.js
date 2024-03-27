const mongoose = require("mongoose")
const bcrypt = require("bcrypt"); 
const { generateAccessToken } = require("../auth/generateTokens");
const { generateRefreshToken } = require("../auth/generateTokens");
const getUserInfo = require("../lib/getUserInfo")
const Token = require("../schema/token")

const userSchema = new mongoose.Schema({

    id: { type: mongoose.Schema.Types.ObjectId },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
})

userSchema.pre("save", function (next) {
    if(this.isModified('password') || this.isNew ) {
        const document = this;

        bcrypt.hash(document.password,10, (err,hash) => {
            if(err){
                next(err);
            }else {
                document.password = hash;
                next();
            } 
        })
    } 
})

userSchema.methods.usernameExists = async function (username) {
    const result = await mongoose.model("User").findOne({ username });

    return !!result;
}

userSchema.methods.comparePassword = async function (password, hash) {
    const same = await bcrypt.compare(password, hash);
    return same
}

userSchema.methods.createAccessToken = function () {
    return generateAccessToken(getUserInfo(this))
}
userSchema.methods.createRefreshToken = async function () {
   const refreshToken = generateRefreshToken(getUserInfo(this));
   try {
    await new Token({ token: refreshToken}).save()

    return refreshToken;
   }catch (error){
    console.log(error)
   }
}

module.exports = mongoose.model("User", userSchema)
