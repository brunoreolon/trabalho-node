const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    status: {type: String}
},
{
    timestamps: true
});

mongoose.model('Person', personSchema);