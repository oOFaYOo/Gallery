const http = require("http");
const fs = require('fs');
const path = require('path');


let server = new http.Server;

server.listen(80, "127.0.0.1");

server.on("request", function (req, res) {
    if(req.method === "GET" && req.url === "/images"){
        let listOfImages = fs.readdirSync("images");
        res.statusCode = 200;
        res.end(JSON.stringify(listOfImages));
    }
})

