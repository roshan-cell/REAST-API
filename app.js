const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

const mongoURL = 'mongodb+srv://user-5:ZmMsfhdkcOhKeItk@cluster0.loxwn.mongodb.net/user-5?retryWrites=true&w=majority'

mongoose.connect(mongoURL , {useNewUrlParser:true,useUnifiedTopology: true }) 
    .then((result)=> console.log("connected"))
    .catch((err) => console.log(err))

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json()) // it (parses/simplifies to readable javascript ), the incoming JSON request and puts parsed data in req



const productSchema = new mongoose.Schema({
    name:String ,
    description : String ,
    price : Number ,
})


const Product = new mongoose.model("Product" ,  productSchema)  // creating a collection



//create Product
app.post('/new' ,async(req,res)=> {

    const product = await Product.create(req.body);
    res.status(200).json({
        success : true ,
        product
    })
})


//to get all products
app.get('/products' , async(req, res)=> {

   const products = await Product.find() ;

   res.status(200).json({
        success:true ,
        products
    })
})


//Update Product
app.put('/product/:id' ,async(req,res)=> {

    let product = await Product.findById(req.params.id) ;  //to find the product

    if(!product){
        return res.status(500).json({
            success : true ,
            message : "This product is not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body , {new:true ,
        useFindAndModify:false,
        runValidators:true 
    })
    res.status(200).json({
        success : true ,
        product
    })
})

 
// Delete product
app.delete('/product/:id' , async(req,res)=> {

    const product = await Product.findById(req.params.id) ;

    if(!product){
        return res.status(500).json({
            success : false ,
            message : "This product is not found"
        })
    }
        await product.remove();

        res.status(200).json({
            success : true ,
            message : "Product is deleted Succesfully "
        })
})






  
 


app.listen(4500, () => {
    console.log('server is listning http://localhost:45000')
})
  

//ZmMsfhdkcOhKeItk