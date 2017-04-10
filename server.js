var express = require('express');
var moment=require('moment');
var app = express();

var port = process.env.PORT || 8080;

app.get('/:time', function (req, res) {
    var time=req.params.time,json={};
    console.log(time);
    if(time.match(/^\d+$/g)){
        console.log("unix timestamp");
        json["unix"]=time;
        json["natural"]=moment.unix(time).format("MMMM D, YYYY");
    }else{
        console.log("natural timestamp");
        time=moment(time,"MMMM D, YYYY");
        json["unix"]=time.format("X");
        json["natural"]=time.format("MMMM D, YYYY");
    }
    res.status(200).end(JSON.stringify(json));
});

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});