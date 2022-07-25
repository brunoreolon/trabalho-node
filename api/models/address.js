const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    person_id: {type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},
    zipCode: {type: String, required: true},
    publicPlace: {type: String, required: true},
    number: {type: String, required: true},
    complement: {type: String, required: true},
    district: {type: String, required: true},
    city: {type: String, required: true},
    uf: {type: String, required: true}
},
{
    timestamps: true
});

mongoose.model('Address', addressSchema);