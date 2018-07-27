var pool = require('./pool')
var dao = {}
dao.login = function (user, res) {
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        connection.query(`select * from test_user where username=${user.username} and password=${user.password}`,
            (err, result) => {
                if (err)
                    console.log(err)
                if (result.length > 0) {
                    if (user.remember) {
                        console.log(2222222)
                        res.cookie("userId", result[0].id, { maxAge: 1000 * 60 * 10 })
                    }
                    res.send("登录成功")
                } else {
                    res.send("登录失败")
                }
                connection.release()
            })
    })
}
dao.register = (user, res) => {
    console.log(user)
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        var sql = 'insert into test_user(username,password) values(?,?)'
        // console.log(sql)
        connection.query(sql, [user.username, user.password],
            (err, result) => {
                if (err)
                    console.log(err)
                console.log(result)
                connection.release()
                res.send("注册成功")
            })

    })
}

dao.selectUserById = (userId, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        var sql = "select id,username,password from test_user where id=?"
        connection.query(sql, [userId], (err, result) => {
            if (err)
                throw err
            console.log(result)
            res.render('register', { user: result[0], title: "用户更新" })
            connection.release()
        })
    })
}
dao.updateUserById = (user, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        var sql = "update test_user set username=?,password=? where id=?"
        connection.query(sql, [user.username, user.password, user.id], (err, result) => {
            if (err)
                throw err
            console.log(result)
            // res.render('register', { user: result[0], title: "用户更新" })
            res.send("更新成功")
            connection.release()
        })
    })
}
dao.delete = (userId,res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err
        var sql = "delete from test_user where id=?"
        connection.query(sql, [userId], (err, result) => {
            if (err)
                throw err
            console.log(result)
            res.json({ result: "删除成功" })
            connection.release()
        })
    })
}
module.exports = dao