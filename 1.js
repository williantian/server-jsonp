var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var path = request.url
    var query = ''
    if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?')) }
    var pathNoQuery = parsedUrl.pathname
    var queryObject = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/













    console.log('方方说：得到 HTTP 路径\n' + path)
    console.log('方方说：查询字符串为\n' + query)
    console.log('方方说：不含查询字符串的路径为\n' + pathNoQuery)


    if (path === '/') {
        var string = fs.readFileSync('./index.html', 'utf8')
        var amount = fs.readFileSync('./db', 'utf8')//db相当于一个数据库
        string = string.replace('&&&amount&&&', amount)//将db中文件信息替换到index
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(string)
        response.end()

    } else if (path === '/style.css') {
        var string = fs.readFileSync('./style.css', 'utf8')
        response.setHeader('Content-Type', 'text/css')
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        var string = fs.readFileSync('./main.js', 'utf8')
        response.setHeader('Content-Type', 'application/javascript')
        response.write(string)
        response.end()
    } else if (path === '/pay') {//路径为pay并且请求为POST
        var amount = fs.readFileSync('./db', 'utf8')//先找db中的文件信息，然后替换
        var newAmount = amount - 1
        // 流程就是路径/为服务器  开启后就会将数据库db信息替换index，index.html发送POST请求，而后开始更新db中的信息
        if (Math.random() > 0.5) {
            fs.writeFileSync('./db', newAmount)
            response.statusCode = 200
            response.write(`
          ${query.callback}.call(undefined,'success')
        `)
            response.end()
        } else {
            response.statusCode = 400
            response.write('fail')
            response.end()
        }
        response.write('success')
        response.end()
    }
    else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write('找不到对应的路径')
        response.end()
    }









    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)