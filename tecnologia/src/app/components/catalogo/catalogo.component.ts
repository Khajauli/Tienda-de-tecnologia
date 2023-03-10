import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CargarService } from 'src/app/services/cargar.service';
import { Global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers:[ProductoService,CargarService]
})
export class CatalogoComponent implements OnInit{
  public productos:Producto[];
  public seleccionados:Producto[];
  public url:string;
  public nombre:string;
  public status:string;


  constructor(
    private _productoService:ProductoService
  ){
    this.url=Global.url;
    this.productos=[];
    this.seleccionados=[];
    this.nombre='';
    this.status='failed';
  }


  ngOnInit():void{
    this.getProductos();
  }
  getProductos(){
  this._productoService.getProductos().subscribe(
    response=>{
      if (response.productos){
        this.productos=response.productos;
        console.log(this.productos);
        this.status='failed';
      }
    },
    error=>{
      console.log(<any>error);
    }
  );
}

getSeleccionados(){
  this._productoService.getProductoN(this.nombre).subscribe(
    response=>{
      if(response.producto){
        this.seleccionados=response.producto;
        console.log(this.seleccionados);
        this.status='success';
        
      }else{
        console.log("error");
      }
    },
    error=>{
      console.log(<any>error);
    }
  )
}
}
