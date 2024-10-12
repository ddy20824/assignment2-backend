import express from 'express'

import productController from '../controllers/product.controller.js'

const router = express.Router()

router.param('id', productController.productByID)

router.route('/api/products')
    .get(productController.list)
    .post(productController.create)
    .delete(productController.removeAll)

router.route('/api/products/:id')
    .get(productController.read)
    .put(productController.update)
    .delete(productController.remove)

export default router

