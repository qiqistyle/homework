### Setup Project

- Ensure  you can connect mysql database
- you can custom these code to connect your database

```
let connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ddd',
    port: '3306',
})
```

- Create user_info table with name and  password filed 
- use user_info_20221015.sql to insert data.

```shell
npm install
node server.js
```

- Register and Login function can click   http://localhost:3000 to use
- Query user information http://localhost:3000/user_info?username=<username>