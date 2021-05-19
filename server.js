// create a server
let http = require('http')
let url = require('url')
let util = require('util')
let fs = require('fs')

let server = http.createServer((req, res) => {

    var pathname = url.parse(req.url).pathname
    console.log('pathname:' + pathname)
    console.log('file:' + pathname.substring(1))
    fs.readFile(pathname.substring(1), (err, data) => {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            })
        } else {
            const filename = pathname.substring(1);
            if (filename.indexOf('.html') > 0) {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.write(data.toString())
                res.end()
            } else if (filename.indexOf('.css') > 0) {
                res.writeHead(200, {
                    'Content-Type': 'text/css'
                })
                res.write(data.toString())
                res.end()
            } else if (filename.indexOf('.json') > 0) {
                res.writeHead(200, {
                    'Content-Type': 'application/json;charset=utf-8'
                })
                res.write(data.toString())
                res.end()
            } else if (filename.indexOf('.jpeg') > 0) {
                res.writeHead(200, {
                    'Content-Type': 'image/jpeg;charset=UTF8'
                })
                var stream = fs.createReadStream('./'+filename);
                var responseData = [];//存储文件流
                if (stream) {//判断状态
                    stream.on('data', function (chunk) {
                        responseData.push(chunk);
                    });
                    stream.on('end', function () {
                        var finalData = Buffer.concat(responseData);
                        res.write(finalData);
                        res.end();
                    });
                }
            }
        }
        
    })
})

server.listen(3000, '127.0.0.1', () => {
    console.log('The server is already running, please open the browser and enter: http://127.0.0.1:3000/ to visit')
})
