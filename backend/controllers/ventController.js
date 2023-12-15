const Vent = require('../models/ventModel');
const User = require('../models/userModel');

const PostVent = async (req, res) => {
    const { message } = req.body;
    const vent = await Vent.create({
        message
        // sender: req.user._id
    });
    if (vent) {
        res.status(200).json({
            _id: vent._id,
            message: vent.message
            // sender: vent.sender
        });
    }
};

const ReadVent = async (req, res) => {
    const vent = await Vent.find();
    if (vent) {
        res.status(200).json(vent);
    }
}
module.exports = { PostVent, ReadVent };