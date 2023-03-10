import userModel from "../../DB/Model/user.js";
// import { config } from "dotenv";
// config();
// sendgrid configuration
import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;
const SECRETKEY = process.env.SECRET_KEY;
const activeKey = process.env.ACTIVE_KEY;

//bcrypt > library to hash passwords.
import bcrypt from "bcrypt";
const { hash, compare } = bcrypt;
const SALT = Number(process.env.SALT);

import { v2 as cloudinary } from "cloudinary";
// cloudinary configuration
cloudinary.config({
  cloud_name: "dtj6j4tpa",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// get all role function
const allUser = async (req, res) => {
  await userModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// Register function
const register = async (req, res) => {
  const { userName, email, password, role } = req.body;
  if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)) {
    const savePass = await hash(password, SALT);
    const data = {
      userName,
      email,
      password: savePass,
      role,
    };
    const token = sign(data, activeKey, { expiresIn: "15m" });

    // Sendgrid/mail
    const msg = {
      to: email,
      from: "cutange1414@hotmail.com",
      subject: "Email verification",
      html: ` <button><a href=${process.env.ACTIVE_URL}/user/${token} >verificate your email</a></button>`,
    };
    sendgrid
      .send(msg)
      .then(() => {
        res.status(201).json("Email has been sent, please activate it");
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    res.status(210).json("you need to insert a complix password");
  }
};

// for activating email
const emailActivate = (req, res) => {
  const { token } = req.params;
  if (token) {
    verify(token, activeKey, (err, decodedToken) => {
      if (err) {
        return res.status(400).json("Expired link");
      }
      const { userName, email, password, role } = decodedToken;
      const creatUser = new userModel({
        userName,
        email,
        password,
        role,
      });
      creatUser
        .save()
        .then((result) => {
          res
            .status(201)
            .send(
              `<h1>Email has been activated</h1> <button><a href=${process.env.LOG_PAGE}>Log In</a></button>`
            );
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  } else {
    return res.status(400).json("wrong activated");
  }
};

const forgetPass = (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json("user with this email dosn't exists");
    }
    const token = sign({ _id: user._id }, activeKey, { expiresIn: "15m" });
    // Sendgrid/mail
    const msg = {
      to: email,
      from: "cutange1414@hotmail.com",
      subject: "password rest",
      html: ` <button><a href=${process.env.LOG_PAGE}reset-pass/${token}>reset your password</a></button>`,
    };
    send(msg)
      .then(() => {
        console.log("Email sent");
        res.status(201).json("Email has been sent,reset it");
      })
      .catch((error) => {
        console.error(error);
      });
    userModel
      .updateOne({ password: userModel.password })
      .then((result) => {
        return res.status(201).send(`hi`);
        // `<button><a href=${process.env.ACTIVE_URL}>re</a></button>`
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};

const updatePass = async (req, res) => {
  const { password, _id } = req.body;
  const { token } = req.params;

  const userId = await userModel.findOne({ _id });

  if (token == userId) {
    await userModel.findOneAndUpdate(
      { _id },
      { $set: { password } },
      { new: true }
    );
    res.status(201).json("done");
  } else {
    return res.status(403).json("forbidden");
  }
};
// LogIn function

const logIn = (req, res) => {
  const { userName, email, password } = req.body;

  userModel
    .findOne({ $or: [{ email }, { userName }] })
    .then(async (result) => {
      if (result) {
        const savePass = await compare(password, result.password);
        if (savePass) {
          const payload = {
            role: result.role,
            id: result._id,
          };
          const token = sign(payload, SECRETKEY);
          return res.status(200).json({ result, token });
        } else {
          res.status(400).json("invalid email or password");
        }
      } else {
        return res.status(404).json("User Not found");
      }
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

// delete user function

const deleteUser = async (req, res) => {
  const { _id } = req.body;

  await userModel
    .findByIdAndUpdate({ _id }, { $set: { isDeleted: true } }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// undelete user function

const undeleteUser = async (req, res) => {
  const { _id } = req.body;

  await userModel
    .findByIdAndUpdate({ _id }, { $set: { isDeleted: false } }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//   get user profile
const profile = async (req, res) => {
  const { userName, _id } = req.query;

  await userModel
    .find({ $or: [{ userName }, { _id }] })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateProfile = async (req, res) => {
  try {
    const { _id, userName, avatar } = req.body;
    let img;
    if (avatar) {
      const cloude = await cloudinary.uploader.upload(avatar, {
        folder: "social-profile",
      });
      img = cloude.secure_url;
    }
    await userModel
      .findByIdAndUpdate(
        { _id },
        { $set: { userName, avatar: img } },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  register,
  logIn,
  allUser,
  deleteUser,
  undeleteUser,
  emailActivate,
  forgetPass,
  updatePass,
  profile,
  updateProfile,
};
