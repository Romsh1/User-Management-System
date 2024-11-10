const axios = require('axios');

exports.homeRoutes = (req, res) => {
    //api request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            // console.log(response);
            res.render('index', {users:response.data});            
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.add_user = (req,res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function(userData){
            const user = userData.data;

            //Formatting the dateOfBirth to 'YYYY-MM-DD'
            const formattedDob = new Date(user.dateOfBirth).toISOString().split('T')[0];

            //Rendering the update_user page by passing the formatted dateOfBirth
            res.render("update_user", { 
                user: { 
                    ...user, 
                    dateOfBirth: formattedDob 
                } 
            });
        })
        .catch(err => {
            res.send(err);
        });
}