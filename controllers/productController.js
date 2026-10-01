import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


export async function createProduct(req, res) {
    try {

        if(isAdmin(req)){
            const product = new Product(req.body);
            await product.save();
            res.json({message: "Product added successfully"});

        }
        else{
            res.status(403).json({ message: "You need to login as admin to create products" });
        }

    }catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error" });
    }

}

export async function getAllProducts(req, res) {
    try {

        if(isAdmin(req)){
            
            const products = await Product.find();
            res.json(products);
        }
        else{
            const products = await Product.find({isAvailable: true});
            res.json(products);
        }

    } catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error" });
    }
}   

export async function deleteProduct(req, res) {
    try {
        const productId = req.params.productId

        if(isAdmin(req)){

            const product = await Product.findById({productID : productId});

            if(product === null){
                res.status(404).json({ message: "Product not found" });
                return;
            }

            await Product.findByIdAndDelete({productId: productId});
            res.json({ message: "Product deleted successfully" });

        }else{
            res.status(403).json({ message: "You need to login as admin to delete products" });
        }

    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}   

export async function updateProduct(req, res) {
    try {
        const productId = req.params.productId

        if(isAdmin(req)){
            const product = await Product.findOne({productID : productId});

            if(product === null){
                res.status(404).json({ message: "Product does not exist" });
                return;
            }
            await Product.findOneAndUpdate({ productId: productId },req.body);

            res.json({ message: "Product updated successfully" });

        }else{
            res.status(403).json({ message: "You need to login as admin to update products" });
        }

    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }   
    
}    
    