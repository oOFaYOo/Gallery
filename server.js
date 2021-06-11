const http = require("http");
const fs = require('fs');
const path = require('path');

let server = new http.Server;

// server.listen(process.env.PORT ? process.env.PORT : 80);
server.listen(80, "127.0.0.1");

server.on("request", function (req, res) {
    if(req.method === "GET" && req.url === "/"){
        res.setHeader("Content-Type", "text/html");
        let stream = fs.createReadStream("mainPage.html");
        stream.pipe(res);
        stream.on("end", ()=> res.end());
        return;
    }

    if (req.method === "GET" && req.url === "/images") {
        res.setHeader('Content-Type', "application/json");
        fs.readdir("images", (err, data) => {
            let list = data.map(file => {
                return path.join("images", file);
            });
            res.end(JSON.stringify(list));
        });
        return;
    }

    if (req.method === "GET") {
        if (req.url.split(".")[req.url.split(".").length - 1] === "js") {
            res.setHeader('Content-Type', "text/javascript");
        } else {
            res.setHeader("Content-Type", req.headers.accept.split(",")[0]);
        }
        let stream = fs.createReadStream(`./${req.url}`);
        stream.pipe(res);
        stream.on("end", () => res.end());
        return;
    }

    if(req.method === "DELETE"){
        fs.unlink("./"+req.url, (err)=>{
            if(err){
                console.error(err);
            } else {
                res.end();
                console.info("Файл удален");
            }
        })
        return;
    }

    if(req.method === "PUT"){
        let stream = fs.createWriteStream("./images"+req.url);
        req.pipe(stream);
        req.on('end', () => res.end());
        console.info("Файл загружен");
        return;
    }
});

