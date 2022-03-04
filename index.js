const express=require("express");

const { use } = require("express/lib/application");

const mysql=require("mysql2");

const app=express();

let port=4000;

app.use(express.json());

 
const db=mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:"bookshop",
    port:3306,

});
 
db.connect((err)=>{

    if(err)
    {
        console.log(err,"error");

    }
    else
    {
console.log("database connectted");
    }
});

app.get("/:id",(req,res)=>{
    let id=req.params.id;
    let qry="SELECT * FROM `books` WHERE book_id='"+id+"'";
    db.query(qry,(err,result)=>{
        if(err)
         {
      res.send(err,"error");
 }
 if(result.length>0)
 {
     res.send({status:true,msg:"databased connected",data:result});
 }
 else
 {
res.send({status:false,msg:"failed"});
 }
    
    });
});
 
app.post("/insert",(req,res)=>{

    let bookname=req.body.bookname;
    let pages=req.body.pages;
    let price=req.body.price;
    let qry="INSERT INTO `books`( `bookname`, `pages`, `price`) VALUES ('"+bookname+"','"+pages+"','"+price+"')";
    db.query(qry,(err,result)=>{
        if(err)
        {
console.log(err);
        }
        console.log(result);
        if(result.affectedRows == 1)
        {
            res.send({status:true,msg:"success",data:result});
        }
        else
        {
res.send({status:false,msg:"failes"});
        }
        

    });

});
app.listen(port,()=>{
    console.log("server is connected");
});
