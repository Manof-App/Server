// Imports
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UTILS = require("../../common/utils.js");

// Create user schema
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
      unique: true,
      validate(value) {
        if (!UTILS.isValidId(value)) {
          throw new Error("ID number must be 9 digits length");
        }
      },
    },

    firstName: {
      type: String,
      required: false,
      trim: true,
      validate(value) {
        if (!UTILS.isValidName(value)) {
          throw new Error("Name must be minimum 2 characters");
        }
      },
    },

    lastName: {
      type: String,
      required: false,
      trim: true,
      validate(value) {
        if (!UTILS.isValidName(value)) {
          throw new Error("Name must be minimum 2 characters");
        }
      },
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
        if (!UTILS.isValidPassword(value)) {
          throw new Error("Password is invalid");
        }
      },
    },

    // address: {
    //   require: false,
    //   house: {
    //     type: String,
    //     require: false,
    //     default: "House address is missing",
    //   },

    //   street: {
    //     type: String,
    //     require: false,
    //     default: "Street address is missing",
    //   },

    //   city: {
    //     type: String,
    //     require: false,
    //     default: "City address is missing",
    //   },
    // },

    phone: {
      type: String,
      required: false,
      validate(value) {
        if (!validator.isMobilePhone(value, ["he-IL"])) {
          throw new Error("Invalid phone number");
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

userSchema.virtual("activities", {
  ref: "Activity",
  localField: "email",
  foreignField: "relatedEmailId",
});

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

  const token = jwt.sign(
    { userId: user.userId.toString() },
    "Omer&ZachManofApp"
  );

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
/*userSchema.pre("remove", async function (next) {
  const user = this;

  await Order.deleteMany({ relatedCustomerId: user._id });

  next();
});*/

// Create user model and exports
const User = mongoose.model("User", userSchema);
module.exports = User;
