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

// exports.update_user = (req,res) => {
//     axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
//         .then(function(userData){
//             res.render("update_user",{user:userData.data})
//         })
//     .catch(err=>{
//         res.send(err);
//     })
// }
exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function(userData){
            const user = userData.data;

            // Format the dateOfBirth to 'YYYY-MM-DD'
            const formattedDob = new Date(user.dateOfBirth).toISOString().split('T')[0];

            // Render the update_user page, passing the formatted dateOfBirth
            res.render("update_user", { 
                user: { 
                    ...user, // Spread the rest of the user fields
                    dateOfBirth: formattedDob // Update the dateOfBirth with the formatted date
                } 
            });
        })
        .catch(err => {
            res.send(err);
        });
}