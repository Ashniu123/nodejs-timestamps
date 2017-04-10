var express = require('express');
var moment=require('moment');
var app = express();

var port = process.env.PORT || 8080;

app.get('/',function(req,res){
    res.status(200).end(`
<div style="font-family: Arial,sans-serif;">
<h1>API Basejump: Timestamp microservice</h1>
<h2>User stories:</h2>
<ol>
<li>I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
<li>If it does, it returns both the Unix timestamp and the natural language form of that date.
<li>If it does not contain a date or Unix timestamp, it returns null for those properties.
</ol>
<p>Example usage:<ul style="none">
<li><a href="https://ashniu123-timestamp.herokuapp.com/December%2015,%202015" target="_blank">https://ashniu123-timestamp.herokuapp.com/December%2015,%202015</a>
<li><a href="https://ashniu123-timestamp.herokuapp.com/1450137600" target="_blank">https://ashniu123-timestamp.herokuapp.com/1450137600</a>
</p>
<p>Example output:<br>
{ "unix": 1450137600, "natural": "December 15, 2015" }
</p>
</div>
`);
});

app.get('/:time', function (req, res) {
    var time=req.params.time,json={};
    if(time.match(/^\d+$/g)){
        json["unix"]=time;
        json["natural"]=moment.unix(time).format("MMMM D, YYYY");
    }else{
        time=moment(time,"MMMM D, YYYY");
        json["unix"]=time.format("X");
        json["natural"]=time.format("MMMM D, YYYY");
    }
    res.status(200).end(JSON.stringify(json));
});

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});