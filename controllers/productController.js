import productModel from "../models/productModel.js";
// import categoryModel from "../models/categoryModel.js";
// import orderModel from "../models/orderModel.js";

import fs from "fs";
import slugify from "slugify";
// import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();


export const createProductController = async (req, res) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in crearing product",
        });
    }
};


//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo") //latest photo uploaded
            .limit(12)
            .sort({ createdAt: -1 });//latest photo created
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "get all Products successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting products",
            error: error.message,
        });
    }
};


// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};

// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};