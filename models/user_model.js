import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      minlength: [3, "Minimun name length is 3 chars"],
      maxlength: [20, "Maximum name length is 3 chars"]
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Prevents duplicate email entries
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, "Role error, not set role"],
        default: "user"
    },
    profilePicture: {
        type: String,
        default: null,
        required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

// Pre-save hook to hash the password before saving if it is modified
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        // const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to compare candidate password with the user's hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


//find user by username
userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username })
}

//find user by email
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email })
}

// Virtual property to return a simplified user profile
userSchema.virtual('profile').get(function () {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        profilePicture: this.profilePicture,
        createdAt: this.createdAt
    };
});

const User = mongoose.model("User", userSchema)

export default User