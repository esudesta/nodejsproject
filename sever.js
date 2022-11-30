if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const mongoose =  require("mongoose")

const indexRouter = require("./routes/index")

const PORT = process.env.PORT || 8000
const app = express()

app.set("view engine","ejs")
app.set("views",__dirname+"/views")
app.set("layout","layouts/layout")

app.use(expressLayouts)
app.use("/static",express.static("./public"))

app.use("/",indexRouter)

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection

db.on("error",(err)=>{
    console.log(err);
})

db.once("open",()=>{
    console.log("connected to db");
})
app.listen(PORT,()=>{
    console.log("server listning on port ",PORT);
})