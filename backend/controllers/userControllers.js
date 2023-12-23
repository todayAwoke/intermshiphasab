const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const jwt = require('jsonwebtoken');
const jwtSecret = "htisisthesecretkey";
const registerUser = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(400);
        throw new Error("Please enter all Fields");
    }
    const userExists = await User.findOne({ name: name })
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");

    }
    const user = await User.create({
        name,
        password,
    });
    // console.log(user);
    jwt.sign(
        { userId: user._id },
        jwtSecret,
        {},
        (err, token) => {
            if (err) {
                throw err;
            }
            res
                .cookie('token', token, { sameSite: 'none', secure: true })
                .status(201)
                .json({ id: user._id }); // Include userId in the response JSON
            console.log(token)
        }
    );
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Failed to create user")
    }
};

const authUser = async (req, res) => {
    const { name, password } = req.body;
    // console.log(name, password)
    const user = await User.findOne({ name });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Username or Password");
    }
};
//api/user?search=awoke
const allUsers = async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },

            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
};


module.exports = { registerUser, authUser, allUsers };
