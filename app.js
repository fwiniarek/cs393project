var express = require('express');
const morgan = require('morgan')
var mysql = require('mysql');
 
var app = express();

app.use(express.static("views")); 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));//parses URL-encoded data


//MySQL connection string
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DND' 
});
    
    //checking connection 
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.set("view engine", "ejs");



app.get("/home", function(req, res) {
    res.render("home");
});
/*
app.get("/sess", function(req, res) {
    res.render("sess");
});
*/

app.get("/sess", function(req, res) {
    var q = "select * from Sessions";
    con.query(q, function(error, results) {
        if (error) throw error;
    res.render("sess", { data: results });
    });
});    

app.get("/schedule", function(req, res) {
    res.render("schedule");
});


app.post("/log", function(req, res) {
    let sess_date = req.body.dateInput;
    let sess_atten = req.body.attenInput;
    let sess_events= req.body.eventsInput; 
    var session_info = { sessDate: sess_date, sessAttendance: sess_atten, sessEvents: sess_events}; 

    var q = "insert into sessions set ?";
    con.query(q, session_info, function(error, results) {
    if (error) throw error;
    res.redirect("/sess");
    });
});

let searchedSessID;
app.post("/search", function(req, res){
    var sessID = req.body.sessID;
    console.log("Searched Session ID:" + sessID);
    var q = "select * from Sessions where sessID = ?";
        
    con.query(q, [sessID], function(error, results) {
    if (error) throw error;
    else {
        if (results.length == 0) //search unsuccessful
        res.send("No session found with ID: " + sessID);
        else //search successful 
        res.render("search_result", { data: results[0] });
        searchedSessID=req.body.sessID;
    }
})});



app.post("/delete", function(req, res){
    console.log("Deleted Session ID:" + searchedSessID);
    var q = "delete from Sessions where sessID = ?";
        
    con.query(q, [searchedSessID], function(error, results) {
    if (error) throw error;
    else {
        if (results.length == 0) //search unsuccessful
        res.send("No session found with ID: " + searchedSessID);
        else //search successful 
        res.render("mod");
    }
})});

app.post("/edit", function(req, res){
    var sessID = req.body.sessID;
    console.log("Searched Session ID:" + searchedSessID);
    var q = "select * from Sessions where sessID = ?";
        
    con.query(q, [searchedSessID], function(error, results) {
    if (error) throw error;
    else {
        if (results.length == 0) //search unsuccessful
        res.send("No session found with ID: " + searchedSessID);
        else //search successful 
        res.render("editpage", { data: results[0] });
    }
})});


app.post("/editsubmit", function(req, res) {
    let sess_date = req.body.dateInput;
    let sess_atten = req.body.attenInput;
    let sess_events= req.body.eventsInput; 
    var session_info = { sessDate: sess_date, sessAttendance: sess_atten, sessEvents: sess_events}; 

    var q = "update sessions set ? where sessID ="+searchedSessID;
    con.query(q, session_info, function(error, results) {
    if (error) throw error;
    res.render("mod");
    });
});






app.listen(8080, function () {
    console.log('App listening on port 8080!');
});
    