$("#add_user").submit(function(event){
    alert("Data inserted successfully");
});

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}
    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
    })
    console.log(unindexed_array);

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert("Data updated successfully");
    })
})

$(document).on("click", ".delete-button", function() {
    var id = $(this).attr("data-id");
    console.log("Delete button clicked for user with ID:", id);

    var request = {
        "url": `http://localhost:3000/api/users/${id}`,
        "method": "DELETE"
    };

    if (confirm("Are you sure you want to delete this record?")) {
        $.ajax(request).done(function(response) {
            alert("Data deleted successfully");
            //Redirect to index page after successful deletion
            window.location.href = "/";
        });
    }
});