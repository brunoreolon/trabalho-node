const mongoose = require('mongoose');
const PersonModel = mongoose.model('Person');
const AddressModel = mongoose.model('Address');

module.exports = {

    get_all_address: async (req, res, next) => {
        try {
            const address = await AddressModel.find({address: req.address});
            
            res.status(200).json({
                count: address.length,
                address: address.map(address => {
                    return {
                        city: address.city,
                        _id: address._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/address" + address._id
                        }
                    }
                })
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    get_by_id: async (req, res, next) => {
        const id = req.params.addressId;
        try {
            const address = await AddressModel.findOne({_id: id});
            if (address) {
                res.status(200).json({
                    address: address,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/address"
                    }
                });
            } else {
                res.status(404).json("Address not found!");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    register_address: async (req, res, next) => {
        try {
            if (!req.body.personId) {
                console.log("--------------");
                res.status(404)
                .json({message: "Person not found!"});
                return;
            }

            let person = null;
            try {
                person = await PersonModel.findOne({_id: req.body.personId});
                if (!person) {
                console.log("==================");
                    res.status(404). json({message: "Person not found!"});
                    return;
                }
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }

            if (person) {
                let address = new AddressModel({
                    person: req.body.personId,
                    zipCode: req.body.zipCode,
                    publicPlace: req.body.publicPlace,
                    number: req.body.number,
                    complement: req.body.complement,
                    district: req.body.district,
                    uf: req.body.uf,
                    city: req.body.city
                });
                address = await address.save();
                res.status(201).json({
                    message: "Created address successfully",
                    createAddress: {
                        person: address.person,
                        _id: address._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/address/" + address._id
                        }
                    }
                })
            }

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    update_address: async (req, res, next) => {
        const id = req.params.addressId;
        const update = {};
        Object.entries(req.body).map (item => {
            console.log(item);
            update[item[0]] = item[1];
        });
        try {
            let status = await AddressModel.updateOne({_id: id},
                {$set: update});
            res.status(200).json({
                message: 'Update address',
                status: status,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/address/" + id
                }
            })    
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    delete_address: async (req, res, next) => {
        const id = req.params.addressId;
        try {
            let status = await AddressModel.deleteOne({_id: id});

            res.status(200).json({
                message: 'address successfully deleted!',
                status: status
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}