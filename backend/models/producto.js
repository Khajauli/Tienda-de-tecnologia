'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var productoSchema = Schema({
    nombre:String,
    categoria:String,
    precio:Number,
    cantidad:Number,
    descripcion:String,
    imagen:String
});

module.exports=mongoose.model('Producto', productoSchema);
