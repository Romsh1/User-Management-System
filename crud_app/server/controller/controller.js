var Userdb = require('../model/model');

//ceating and saving new user
exports.create = (req,res) => {
    //validate request
    if(!res.body) {
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }

    //adding a new user
    const user = new Userdb({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        dateOfBirth: req.body.dateOfBirth,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        userNotes: req.body.userNotes
    })

    //saving user in the database
    user
        .save(user) 
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

//retrieving and returning all users or a single user
exports.find = (req, res) => {

}

//Update users by user id
exports.update = (req, res) => {

}

//deleting user with specified used id
exports.delete = (req, res) => {

}