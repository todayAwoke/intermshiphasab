const mongoose = require('mongoose');
const ventModel = mongoose.Schema({
    message: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
    { timestaps: true }
)
const Vent = mongoose.model('vent', ventModel);
module.exports = Vent;