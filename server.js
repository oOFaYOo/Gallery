const http = require("http");
const fs = require('fs');
const path = require('path');

let server = new http.Server;

server.listen(80, "127.0.0.1");

server.on("request", function (req, res) {
    if(req.method === "GET" && req.url === "/"){
        fs.readFile('mainPage.html', (err, data)=>{
            res.setHeader('Content-Type', "text/html");
            res.end(data);
        });
        return;
    }
    if(req.method === "GET" && req.url === "/index.js"){
        fs.readFile('index.js', (err, data)=>{
            res.setHeader('Content-Type', "text/javascript");
            res.end(data);
        });
        return;
    }
    if(req.method === "GET" && req.url === "/style.css"){
        fs.readFile('style.css', (err, data)=>{
            res.setHeader('Content-Type', "text/css");
            res.end(data);
        });
        return;
    }
    if(req.method === "GET" && req.url === "/favicon.ico"){
        fs.readFile('favicon.ico', (err, data)=>{
            res.setHeader('Content-Type', "image/vnd.microsoft.icon");
            res.end(data);
        });
        return;
    }
    if(req.method === "GET" && req.url === "/folder_up.png"){
        fs.readFile('folder_up.png', (err, data)=>{
            res.setHeader('Content-Type', "image/png");
            res.end(data);
        });
        return;
    }
    if(req.method === "GET" && req.url === "/api.js"){
        fs.readFile('api.js', (err, data)=>{
            res.setHeader('Content-Type', "text/javascript");
            res.end(data);
        });
        return;
    }
    if(req.method === "GET" && req.url === "/images"){
            fs.readdir("images", (err, data)=>{
            let listOfImages = data.map(file => {
                return path.join("images", file).replace('\\', '/');
            });
            res.statusCode = 200;
            res.setHeader('Content-Type', "application/json")
            res.end(JSON.stringify(listOfImages));

        });
            return;
    }
    let reqUrl = req.url.split("/");
    if(req.method === "GET" && reqUrl[1] === "images"){
        let typePic = reqUrl[2].split(".")[1];
        let type;
        if(typePic === "jpeg" || typePic === "jpg"){
            type = "image/jpeg";
        } else if (typePic === "png"){
            type = "image/png";
        } else if (typePic === "gif"){
            type = "image/gif";
        }
        res.setHeader('Content-Type', type);
        fs.readFile('.' + req.url, (err, data)=>{
            res.end(data);
        })
    }
})

server.on("request", function (req, res) {
    if(req.method === "DELETE"){
        fs.unlink("./"+req.url, (err)=>{
            if(err){
                console.error(err);
            } else {
                console.info("Файл удален");
                res.end();
            }
        })
    }
});

server.on("request", function (req, res) {
        if(req.method === "PUT"){
            let fileStream = fs.createWriteStream("./images"+req.url);
            req.pipe(fileStream);
            req.on('end', () => res.end());
        }
})