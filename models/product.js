import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productID : {
        type: String,
        unique: true,
        required: true,
    },
    name : {
        type: String,
        required:true,   
    },
    altname : {
        type: [String],
        default: [],
    },
    description : {
        type: String,
        required:true,
    },
    image : {
        type:[String],
        default: [],
    },
    price : {
        type: Number,
        required:true,  
    },
    labeledprice : {
        type: Number,
        default:0,
    },
    stock : {
        type :Number,
        default : 0,
    },
    isAvailable : {
        type : Boolean,
        default : true,
    },
    catagory : {
        type : String,
    },
    brand : {
        type : String,
    },
    model : {
        type : String,
    },    

})

const Product = mongoose.model("Product", productSchema);

export default Product;
