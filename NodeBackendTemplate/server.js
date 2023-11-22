const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/productmodel')
const app = express()
app.use(express.json())


app.post("/product",async (req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body)
})
app.get("/products",async (req,res)=>{
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body)
})

app.get("/products/:id",async (req,res)=>{
    try{
        const {id} = req.params 
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body)
})
app.put("/products/:id",async (req,res)=>{
    try{
        const {id} = req.params 
        const product = await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:'cannt find product'})
        }

        const updatedProduct = await Product.findById(id)

        res.status(200).json(updatedProduct)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body)
})
app.delete("/products/:id",async (req,res)=>{
    try{
        const {id} = req.params 
        const product = await Product.findByIdAndDelete(id,req.body)
        if(!product){
            return res.status(404).json({message:'cannt find product'})
        }

        const deletedProduct = await Product.findById(id)

        res.status(200).json(deletedProduct)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    console.log(req.body)
})




mongoose.set("strictQuery",false)
mongoose.connect('mongodb://127.0.0.1:27017/backendtest')
  .then(() => console.log('Connected!'))
  .catch((err)=>console.log(err))




app.get('/',(req,res)=>{
    res.send("hello on 3000")
})
app.get('/blog',(req,res)=>{
    res.send("blog on 3000")
})

app.listen(3000,()=>{
    console.log("Node api onm 3000")
})