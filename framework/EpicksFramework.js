const express = require("express")
const fs = require("fs")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const bodyParser = require('body-parser')

// World most optimized framework fr fr ong !! Originally made by @BodyAlhoha

class EpicksFramework {
    run(port, args) {
        this.files = []
        this.args = args
        this.app = express()
        this.app.disable('x-powered-by');
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(function (req, res, next) {
            res.sendHTML = (file) => {
                let html = fs.readFileSync(file).toString().split("\n")
                res.type("html").send(html.join("\n"))
            }

            res.sendRaw = (text) => {
                res.type("text/plain").send(text)
            }
            next()

        })
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));
        walk("./routes").forEach((file) => {
            let path = file.substring("./routes".length)
            path = path.substring(0, path.length - 3)
            this.files.push("../routes" + path + ".js")
            const route = require("../routes" + path + ".js")
            path = path.replace(".", ":")
            path = path.replace("_", "")
            if (path == "/index") {
                path = "/"
            }
            this.app[route.method](path.replace("_", ":"), async (req, res) => {
                await route.run(this, req, res)
            })
        })


        this.server = this.app.listen(port, () => {
            console.log("bss-v2-api running on port " + port)
        })

    }
}

module.exports.EpicksFramework = EpicksFramework;

var walk = function (dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}