const mongoose = require('mongoose');
const PersonModel = mongoose.model('Person');

module.exports = {

    get_all_persons: async (req, res, next) => {
        try {
            const persons = await PersonModel.find({person :req.person});

            res.status(200).json({
                count: persons.length,
                persons: persons.map(person => {
                    return {
                        name: person.name,
                        lastName: person.lastName,
                        _id: person._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/persons" + person._id
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
        const id = req.params.personId;
        try {
            const person = await PersonModel.findOne({_id: id});
            if (person) {
                res.status(200).json({
                    person: person,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/persons"
                    }
                });
            } else {
                res.status(404).json("Person not found!");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    register_person: async (req, res, next) => {
            try {
                let person = new PersonModel({});
                person.name = req.body.name;
                person.lastName = req.body.lastName;
                person.phone = req.body.phone;
                person.email = req.body.email;
                person.status = req.body.status;

                console.log("------------------- " + person._id);

                person = await person.save();
                res.status(201).json({
                    message: 'Created person successfully',
                    createdPerson: {
                        name: person.name,
                        _id: person._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000" + person._id
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
    }, 

    update_person: async (req, res, next) => {
        const id = req.params.personId;
        const update = {};
        Object.entries(req.body).map (item => {
            console.log(item);
            update[item[0]] = item[1];
        });
        try {
            let status = await PersonModel.updateOne({_id: id},
                {$set: update});
            res.status(200).json({
                message: 'Update Person',
                status: status,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/persons/" + id
                }
            })    
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    delete_person: async (req, res, next) => {
        const id = req.params.personId;
        try {
            let status = await PersonModel.deleteOne({_id: id});

            res.status(200).json({
                message: 'Person successfully deleted!',
                status: status
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}