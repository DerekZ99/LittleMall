const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const formidable = require('formidable')
const app = express()

// 拦截所有请求，修改响应头，修改完成之后放行
app.use((req, res, next) => {
    // 1 允许哪些用户访问我
    // *代表所有的客户端都可以访问我
    res.header('Access-Control-Allow-Origin', '*')
    // 2 允许客户端使用哪些请求访问我
    res.header('Access-Control-Allow-Methods', 'get,post')
    next();
})
app.use(bodyParser.json())

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')))

app.get('/first', (req, res) => {
    res.send('Hellow Ajax')
})

app.get('/testpic', (req, res) => {
    res.send()
})

app.get('/responseData', (req, res) => {
    res.send({
        "name": 'zs'
    })
})

app.listen(3000)
console.log('网站服务器启动成功')