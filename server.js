const http = require("http");
const fs = require('fs');
const path = require('path');
const connect = require("connect");
const errorhandler = require('errorhandler');
const app = connect();
const mime = require('mime-types');

let server = new http.Server(app);

server.listen(process.env.PORT ? process.env.PORT : 80);
// server.listen(80, "127.0.0.1");

app.use(function (req, res, next) {
    if(req.url === "/"){
        res.setHeader("Content-Type", "text/html");
        let stream = fs.createReadStream("./resources/mainPage.html");
        stream.pipe(res);
        stream.on("end", ()=> res.end());
    } else next();
})
app.use(function (req, res, next) {
    if(req.method === "GET" && req.url === "/images"){
        res.setHeader('Content-Type', "application/json");
        fs.readdir("./images", (err, data) => {
            if(err){
                console.error(err);
            }
            let list = data.map(file => {
                return path.join("images", file);
            });
            res.end(JSON.stringify(list));
        });
    } else next();
})

app.use(function (req, res, next) {
    let path;
    req.url.indexOf("images") > -1 ? path = "./" + `${req.url}` : path = "./resources" + `${req.url}`;
    if (req.method === "GET") {
        res.setHeader("Content-Type", mime.lookup(path));
        let stream = fs.createReadStream(path);
        stream.on("error", () => {
            errH(res, next);
        });
        stream.pipe(res);
        stream.on("end", () => res.end());
    } else next();

})

app.use(function (req, res, next) {
    if (req.method === "DELETE") {
        fs.unlink("./" + req.url, (err) => {
            if (err) {
                console.error(err);
            } else {
                res.end();
                console.info("Файл удален");
            }
        })
    } else if(req.method === "PUT"){
        let stream = fs.createWriteStream("./images"+req.url);
        stream.on("error", () => {
            errH(res, next);
        });
        req.pipe(stream);
        req.on('end', () => res.end());
        console.info("Файл загружен");
    } else {
        errH(res, next);
    }
})

app.use(errorhandler());

function errH(res, next) {
    errorhandler.title = "404 NOT FOUND"
    res.statusCode = 404;
    next(new Error("not found"));
}


// server.on("request", function (req, res) {
//     if(req.method === "GET" && req.url === "/"){
//         res.setHeader("Content-Type", "text/html");
//         let stream = fs.createReadStream("mainPage.html");
//         stream.pipe(res);
//         stream.on("end", ()=> res.end());
//         return;
//     }
//
//     if (req.method === "GET" && req.url === "/images") {
//         res.setHeader('Content-Type', "application/json");
//         fs.readdir("images", (err, data) => {
//             let list = data.map(file => {
//                 return path.join("images", file);
//             });
//             res.end(JSON.stringify(list));
//         });
//         return;
//     }
//
//     if (req.method === "GET") {
//         if (req.url.split(".")[req.url.split(".").length - 1] === "js") {
//             res.setHeader('Content-Type', "text/javascript");
//         } else {
//             res.setHeader("Content-Type", req.headers.accept.split(",")[0]);
//         }
//         let stream = fs.createReadStream(`./${req.url}`);
//         stream.pipe(res);
//         stream.on("end", () => res.end());
//         return;
//     }
//
//     if(req.method === "DELETE"){
//         fs.unlink("./"+req.url, (err)=>{
//             if(err){
//                 console.error(err);
//             } else {
//                 res.end();
//                 console.info("Файл удален");
//             }
//         })
//         return;
//     }
//
//     if(req.method === "PUT"){
//         let stream = fs.createWriteStream("./images"+req.url);
//         req.pipe(stream);
//         req.on('end', () => res.end());
//         console.info("Файл загружен");
//         return;
//     }
// });

