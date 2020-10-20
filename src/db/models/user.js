// Imports
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Utils = require("../../common/utils.js");

// Create user schema
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
      default: "מנהל מחלקה",
    },

    userId: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!Utils.isValidId(value)) {
          throw new Error("ID number must be 9 digits length");
        }
      },
    },

    firstName: {
      type: String,
      required: false,
      trim: true,
    },

    lastName: {
      type: String,
      required: false,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(
            "Email is invalid, try again using the suggested pattern name@domain.com"
          );
        }
      },
    },

    password: {
      type: String,
      required: true,
      trim: true,
      default: "",
      validate(value) {
        if (!Utils.isValidPassword(value)) {
          throw new Error("Password is invalid");
        }
      },
    },

    dateOfBirth: {
      type: Date,
      require: false,
      trim: true,
      default: new Date(),
    },

    address: {
      type: String,
      require: false,
      trim: true,
    },

    phone: {
      type: String,
      required: false,
      validate(value) {
        if (!Utils.isValidPhoneNumber(value)) {
          throw new Error("Phone number pattern: 05-xxx-xxxx only!");
        }
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Verify user credentials before login action takes place
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userOBJ = user.toObject();

  delete userOBJ.password;
  delete userOBJ.tokens;

  return userOBJ;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign({ userId: user.userId.toString() }, jwtSecret);

  try {
    user.tokens = user.tokens.concat({ token });
    await user.save();
  } catch (error) {
    console.log("Error", error);
  }

  return token;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Delete user orders when user is removed
// userSchema.pre("remove", async function (next) {
//   const user = this;

//   await Order.deleteMany({ relatedCustomerId: user._id });

//   next();
// });

// Create user model and exports
const User = mongoose.model("User", userSchema);
module.exports = User;
