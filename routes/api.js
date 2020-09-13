
// make request to http://localhost:3000/api/data

// GET REQUEST
$.ajax({
    url: "http://localhost:3000/api/data",
    method: "GET"
}).done(function(data) {
    console.log(data);
});

// POST REQUEST
const postData = {
    noteTitle: "homework",
    noteText: "woo"
};

$.ajax({
    url: "http://localhost:3000/api/data",
    method: "POST",
    data: postData
}).done(function(data) {
    console.log(data);
});