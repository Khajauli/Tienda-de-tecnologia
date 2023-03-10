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
  public url:string;

  constructor(
    private _productoService:ProductoService
  ){
    this.url=Global.url;
    this.productos=[];
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
      }
    },
    error=>{
      console.log(<any>error);
    }
  );
}
}
