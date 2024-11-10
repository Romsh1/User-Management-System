var Userdb = require('../model/model');

//ceating and saving new user
exports.create = (req,res) => {
    //validating request
    if(!req.body) {
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
            // res.send(data)
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

//retrieving and returning all users or a single user
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message:"Not found user with id=" +id})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message:"Error retrieving an user with id" +id})
            })
    }else{
        Userdb
        .find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message:err.message || "Error occurred while retrieving user information"})
        })
    }
}

//Updating users by user id
exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message:"Data to update cannot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body
            ,{UseFindAndModify:false})
            .then(data => {
                if(!data){
                    res.status(404).send({message:`Cannot update user with ${id}. Maybe user not found`})
                }else {
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error update user information"})
            })
}

//deleting user with specified used id
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message:`Cannot delete with id ${id}. Maybe id is wrong`})
            }else {
                res.send({
                    message: "User was deleted successfully"
                })
            }
        })
        .catch(err=> {
            res.status(500).send({
                message: "Could not delete user with id=" +id
            });
        });
}