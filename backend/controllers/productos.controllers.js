'use strict'
var Producto=require('../models/producto');
var fs=require('fs');
var path=require('path');
const { exists } = require('../models/producto');
var controller={
    getInicio:function(req,res){
        return res.status(201).send(
            "<h1>Inicio<h1>"
        );
    },
    saveProducto:function(req,res){
        var producto=new Producto();
        var params=req.body;
        producto.nombre=params.nombre;
        producto.categoria=params.categoria;
        producto.precio=params.precio;
        producto.cantidad=params.cantidad;
        producto.descripcion=params.descripcion;
        producto.imagen=null;
        producto.save((err,productoGuardado)=>{
            if(err) return res.status(500).send({message:"Error al guardar"});
            if(!productoGuardado) return res.status(404).send({message:'No se ha guardado el producto'});
            return res.status(200).send({producto:productoGuardado});
        })
    },
    
    getProductos:function(req,res){
        Producto.find({}).sort().exec((err,productos)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!productos) return res.status(404).send({message:'No existen productos'});
            return res.status(200).send({productos});
        })
    },
    getProducto:function(req,res){
        var productoId=req.params.id;
        if(productoId==null) return res.status(4004).send({message:"El producto no existe"});
        Producto.findById(productoId,(err,producto)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!producto) return res.status(404).send({message:'No existe el producto'});
            return res.status(200).send({producto});
        })
    },
    deleteProducto:function(req,res){
        var productoId=req.params.id;
        if(productoId==null) return res.status(4004).send({message:"El producto no existe"});
        Producto.findByIdAndRemove(productoId,(err,productoBorrado)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!productoBorrado) return res.status(404).send({message:'No se puede eliminar el producto'});
            return res.status(200).send({productoBorrado});
        })
    },
    updateProducto:function(req,res){
        var productoId=req.params.id;
        var update=req.body;
        if(productoId==null) return res.status(4004).send({message:"El producto no existe"});
        Producto.findByIdAndUpdate(productoId,update,{new:true},(err,prodctoActualizado)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!prodctoActualizado) return res.status(404).send({message:'No se puede actualizar el prodcto'});
            return res.status(200).send({prodctoActualizado});
        })
    },
    uploadImage:function(req,res){
        var productoId=req.params.id;
        var fileName="Imagen no subida";

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];
            if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                Producto.findByIdAndUpdate(productoId,{imagen:fileName},{new:true},(err,prodctoActualizado)=>{
                    if (err) return res.status(500).send({message:"La imagen no se ha subido"});
                    if(!prodctoActualizado) return res.status(404).send({message:'El producto no existe y no se subio la imagen'});
                    return res.status(200).send({producto:prodctoActualizado});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:"La extension no es valida"});
                })
            }

        }else{
            return res.status(200).send({message:fileName});

        }

    },
    getImage:function(req,res){
        var file=req.params.imagen;
        var path_file="./uploads/"+file;
        fs.exists(path_file,(exists)=>{
            if(exists) {
                return res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send({message:"No existe la imagen"});
            }
        });
    },
    getProductoN:function(req,res){
        var nombre=req.params.nombre;
        if(nombre==null) return res.status(4004).send({message:"El producto no existe"});
        Producto.find({nombre},(err,producto)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!producto) return res.status(404).send({message:'No existe el producto'});
            return res.status(200).send({producto});
        })
    },
    
}
module.exports=controller;