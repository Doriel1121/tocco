const express = require('express');
const mysql= require('mysql');
const xlsxReader = require('read-excel-file');
const bodyParser = require('body-parser')
var cors = require('cors');
const { response } = require('express');

const app = express()
const port = 5000
app.use(bodyParser.json())
app.use(cors())


var con = mysql.createConnection({
    host: 'orgenizer.csjzksainsxv.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'xxx',
    database: 'organizer'
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

InsertNewRoute = (body , res) => {
    console.table(body.schedule);
let sql = "DELETE FROM organizer.schedule";
con.query(sql, function(err , res) {
    if (err) throw err;
    let sql2 = " INSERT INTO organizer.schedule (name , address , action , machine, smel , ladder , clientComplain , mechanicComment , managercomment , charge  ) VALUES ?"
    con.query(sql2 , [body.schedule] , (err ,res)=>{
        if (err) throw err;
        console.log(res);
    })
})
}

GetMechanicDaylyRoute = (res) => {
let sql = "SELECT * FROM organizer.schedule"
con.query(sql , function(err , resu) {
    if (err) throw err;
    res.send(resu)
})
}

UpdateClientStatus = (body , result , callback) => {
    let sql = "UPDATE organizer.schedule SET status= ? , mechanicComment=? WHERE idschedule = ? " 
    con.query(sql ,  [body.status,body.comment , body.id] , ( err , res) =>{
        if (err) throw err;
        callback()
    })
}

UpdateFinshedRoute = (body , res , callback) => {
    let sql = "UPDATE organizer.schedule SET (name , address , smel , machine , ladder , action  , clientComplain , managercomment , charge , contact  , mechanicComment)  WHERE idschdule = ?"
    con.query(sql , [body] ,(err , res) =>{
        if (err) throw err;
        callback()
    } )
}

app.post("/schedule" , (req , res) => {
    console.log("success");
    InsertNewRoute(req.body , res)
})

app.get("/mechanicroute" , (req , res ) => {
    GetMechanicDaylyRoute(res)
})

app.post("/updateclientstatus" , (req , res)=> {
    UpdateClientStatus(req.body , res , () => {
        res.sendStatus(200)
    })
})

app.post("/doneroute" , (req , res)=>{
    UpdateFinshedRoute(req.body , res , ()=>{
        res.sendStatus(200)
    })
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}!`)
});