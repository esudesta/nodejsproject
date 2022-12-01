if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require("express")
const expressLayouts = require("express-ejs-layouts")

const mongoose =  require("mongoose")

const bodyParser = require("body-parser")

// const dbURL = "mongodb+srv://someone:0914003139@cluster0.dcydvbw.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(dbURL,{useNewUrlParser:true}).then(result=>{
//     console.log("connected to db");
// }).catch(err=>{
//     console.log(err);
// })

const indexRouter = require("./routes/index")
const authorRouter = require("./routes/authors")

const PORT = process.env.PORT || 8000
const app = express()

app.set("view engine","ejs")
app.set("views",__dirname+"/views")
app.set("layout","layouts/layout")


app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit:"10mb",extended:false}))

app.use("/static",express.static("./public"))

app.use("/",indexRouter)
app.use("/authors",authorRouter)

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