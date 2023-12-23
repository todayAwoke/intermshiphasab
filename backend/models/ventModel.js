const mongoose = require('mongoose');

const ventModel = mongoose.Schema(
    {
        message: { type: String, required: true },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

ventModel.pre('save', function (next) {
    const currentDateTime = new Date();
    currentDateTime.setSeconds(0);
    this.createdAt = currentDateTime;
    next();
});

const Vent = mongoose.model('vent', ventModel);
module.exports = Vent;