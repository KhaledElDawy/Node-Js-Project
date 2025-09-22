const express = require("express");
const app = express()
const mongoose = require("mongoose");
const Article = require("./models/Article");

mongoose.connect("mongodb+srv://khaledeldos74:Kh%40led1861996010@myfirstnodejscluster.xtvkvsh.mongodb.net/?retryWrites=true&w=majority&appName=MyFirstNodeJSCluster")
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log("error with connected with DB", error);
  });



app.use(express.json());


app.get("/hello" , (req , res) => {

    res.send("hello");
});

app.get("/" , (req , res) => {

    res.send("Hello in Node Js Project");
});

app.get("/numbers" , (req , res) => {

let numbers = "";
for (let i = 0 ; i <= 100 ; i++){
    numbers += i + " - ";
}

    res.render("numbers.ejs", {
        name : " Khaled",
        numbers: numbers,
    });
});


app.get("/findsummation/:number1/:number2",(req , res) =>{

const num1 = req.params.number1
const num2 = req.params.number2
const total = Number(num1) + Number(num2)
    res.send(`the total is  : ${total}`);
});

app.get("/sayhello",(req , res) =>{

    // console.log(req.body)
    // res.send(`Hello ${req.body.name}`);

    res.json({
        name : req.body.name,
        age : req.query.age,
        language : "Arabic"
    });

});

app.put("/test" , (req , res) => {

    res.send("hello world");
});

app.delete("/testingdelete" , (req ,res) => {
    res.send("delelte request");
});

//=====Article EndPoint=====
app.post("/articles" ,async (req , res) => {

    const artTitle = req.body.articleTitle
    const artBody = req.body.articleBody


    const newArticle = new Article()
    newArticle.title = artTitle;
    newArticle.body = artBody;
    newArticle.numberOfLikes = 0;
    await newArticle.save();
    res.json(newArticle);

});

app.get("/articles",async(req,res) =>{

    const articles = await Article.find();
    console.log("The articles are : ",articles);
    res.json(articles);
});

app.get("/articles/:articleId",async(req,res) => {
    const id = req.params.articleId

    try{
        const article = await Article.findById(id)
        res.json(article);
        return;
    }catch(error){
        console.log("error while reading Article id",id);
        res.send("error");
    }
});

app.delete("/articles/:articleId",async(req,res) => {
    const id = req.params.articleId

    try{
        const article = await Article.findByIdAndDelete(id)
        res.json(article);
        return;
    }catch(error){
        console.log("error while reading Article id",id);
        res.send("error");
    }
});


app.get("/showArticles" , async(req,res) => {
    const articles = await Article.find();
    res.render("articles.ejs" , {
        allArticles:articles,
    });

});

app.listen(3000,() => {
    console.log("i am listening in port 3000");
});