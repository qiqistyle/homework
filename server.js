const express = require('express')
let mysql = require('mysql')
const app = express()
const bodyparser = require('body-parser')
var engines = require('consolidate');
app.engine('html', engines.mustache);
app.set('view engine', 'html')
let config = require('./config.js');
let connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ddd',
    port: '3306',
})
//挂载参数处理的中间件
//extended:false 表示使用系统模块querystring来处理 将字符串转化为对象
app.use(bodyparser.urlencoded({extended: false}))
//挂载内置中间件处理静态文件
app.use(express.static('public'))

//使用form表单提交
app.post('/login', (req, res) => {
    //因为是post,所以使用body
    let data = req.body;
    //判断用户名和密码
    sql = "select * from user_info where name=" + "'" + data.username + "'";
    console.log(sql)
    let r = 0;
    connection.query(sql, data, (error, results, fields) => {
        if (error) {
             res.send('login fail')
        }
        r = results[0];
        if (data.username == r.name && data.password == r.password) {
            res.send('login success')
        } else {
            res.send('login fail')
        }
    });
})
app.post('/register', (req, res) => {
    let data = req.body;
    sql = "insert user_info value("+"'"+data.username+"','"+data.password+"')";
    console.log(sql)
    let r = 0;
    connection.query(sql, data, (error, results, fields) => {
        if (error) {
             res.send('register fail')
        }
        res.send('register success')
    });
})
app.get('/user_info', (req, res) => {
    let data = req.query.username;
    sql = "select * from user_info where name=" + "'" + data+ "'";
    connection.query(sql, data, (error, results, fields) => {
        if (error) {
             res.send('error')
        }
        if(results.length>=1)
        {
            res.send(JSON.stringify(results[0]));
        }else{
            res.send(data+" is not register");
        }
    });
})
app.get('/', (req, res) => {
    res.render('login.html')
})
app.listen(3000, () => {
    console.log('http://localhost:3000');
})
