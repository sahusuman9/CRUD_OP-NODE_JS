import express from 'express'
import Product from '../models/Products.js'

let router = express.Router()

router.get("/", (req,resp) => {
    resp.send("<h1>Product Root Page</h1>")
})


//Create Op- 127.0.0.1:8080/api/newProduct
router.post("/newProduct", async (req,resp) => {
    try {
        let name = req.body.name
        let image = req.body.image
        let price = req.body.price
        let qty = req.body.qty
        let info = req.body.info

        let product = new Product({name,image,price,qty,info})

        await product.save()
        resp.status(200).json({
            result:"Product inserted Sucessfully",
            product:product
        })
        resp.json({"msg":'Working'})
    }
    catch(err) {
        if(err) throw err
        resp.status(500).json({message:err.message})
    }
})


//Read op- 127.0.0.1:8080/api/allProduct
router.get("/all", async (req,resp) => {
    try {
       let products =  await Product.find()
       resp.status(200).json(products)
    }
    catch(err) {
        console.log(err)
        resp.status(500).json({message:err})
    }
})


//Update op- 127.0.0.1:8080/api/products/:id
router.put("/products/:id", async (req, resp) => {
    let prodId = req.params.id   //read url data 
    try {
        let updated_prod = {
            name:req.body.name,
            image:req.body.image,
            price:req.body.price,
            qty:req.body.qty,
            info:req.body.info
        }
        //product exists or not
        let product = await Product.findById(prodId)
        if(!product) {
            resp.status(401).json({"msg":"Product Not Found"})
        }
        product = await Product.findByIdAndUpdate(prodId,{$set:updated_prod},{new:true})
        resp.status(200).json({msg:"Product Updated", product:product})
    }
    catch(err) {
        if(err) throw err
        resp.status(500).json({message:err.message})
    }
})

//Delete op- 127.0.0.1:8080/api/products/:id
router.delete("/products/:id", async (req,resp) => {
    let prodId = req.params.id

    try {
        let product = await Product.findById(prodId)
        if(!product) {
            return resp.status(401).send("Product not found")
        }
        product = await Product.findByIdAndDelete(prodId)
        resp.status(200).json({message:"Product Deleted", product:product})
    }
    catch(err) {
        if(err) throw err
        resp.status(500).json({message:err.message})
    }
})


export default router;