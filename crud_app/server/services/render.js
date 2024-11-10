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
        .then(function (userData) {
            const user = userData.data;

            //Formatting dateOfBirth to 'YYYY-MM-DD' directly using a custom function
            const formattedDob = formatDate(user.dateOfBirth);

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

//Helper function to format date to 'YYYY-MM-DD'
function formatDate(dateString) {
    if (!dateString) return ''; 

    //Creating a Date object from the input dateString
    const date = new Date(dateString);
    
    //Ensuring the date is valid
    if (isNaN(date)) return ''; 

    //Extracting year, month, and day using Date methods
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 

    //Returning the formatted string 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
}
