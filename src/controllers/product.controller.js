import Category from '../models/category.model.js'
import Product from '../models/product.model.js'
import errorHandler from './error.controller.js'
import extend from 'lodash/extend.js'

const create = async (req, res) => {
    const product = new Product(req.body)

    //Check if category exist
    let isCategoryExist = await Category.exists({ name: req.body.category });
    if (!isCategoryExist) {
        return res.status(400).json({
            error: "Wrong category! Please check again."
        })
    }

    try {
        await product.save()
        return res.status(200).json({
            message: "Successfully added a product!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        const { name } = req.query;
        let query = {};
        if (name) {
            //search name contains "keyword" and not case sensitive
            query = { name: { $regex: name, $options: "i" } };
        }
        let products = await Product.find(query);
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }
}

//find the param :id corresponding product
const productByID = async (req, res, next, id) => {
    try {
        let product = await Product.findById(id)
        if (!product)
            return res.status('400').json({
                error: "Product not found"
            })
        req.profile = product
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve product"
        })
    }
}

const read = (req, res) => {
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
        let product = req.profile
        product = extend(product, req.body)
        product.updated = Date.now()
        await product.save()
        res.json(product)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let product = req.profile
        let deletedProduct = await product.deleteOne()
        res.json(deletedProduct)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const removeAll = async (req, res) => {
    try {
        let deletedProduct = await Product.deleteMany()
        res.json(deletedProduct)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, productByID, read, list, remove, update, removeAll }



