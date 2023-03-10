'use strict'
var express=require('express');
var router=express.Router();
var productosRouter = require('../controllers/productos.controllers');
var multiparty=require('connect-multiparty');
var multupartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de home
router.get('/inicio',productosRouter.getInicio);

router.post('/guardarProducto',productosRouter.saveProducto);

router.get('/productos',productosRouter.getProductos);

router.get('/producto/:id',productosRouter.getProducto);

router.put('/producto/:id',productosRouter.updateProducto);

router.delete('/producto/:id',productosRouter.deleteProducto);

router.post('/subir-imagen/:id',multupartyMiddleWare,productosRouter.uploadImage);

router.get('/get-imagen/:imagen',productosRouter.getImage);

router.get('/productoN/:nombre',productosRouter.getProductoN);

module.exports=router; 