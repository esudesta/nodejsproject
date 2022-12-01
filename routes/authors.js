const express = require("express")
const router = express.Router()
const Author = require("../models/author")

router.get("/",async (req,res)=>{
    let searchOptions = {}
    try {
        if (req.query.name != null && req.query.name !=""){
            searchOptions.name = new RegExp(req.query.name,"i")
        }
        const authors =await Author.find(searchOptions)
        res.render("authors/index",{authors:authors,searchOptions:req.query})

    } catch (error) {
        res.redirect("/")
    }
})

router.get("/new",(req,res)=>{
    res.render("authors/new",{"author":new Author()})
})

router.post("/",async (req,res)=>{
    console.log(req.body.name);
    // res.send(req.body.name)
    const author = new Author({
        name:req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect("/authors")
    } catch (error) {
        res.render("authors/new",{author:author,errorMessage:"Error Creating Author"})
    }

    // author.save((err,newAuthor)=>{
    //     if(err){
    //         res.render("authors/new",{author:author,errorMessage:"Error Creating Author"})
    //     }
    //     else{
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect("/authors")
    //     }
    // })
})

module.exports = router