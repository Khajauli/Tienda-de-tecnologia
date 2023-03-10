import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { CargarService } from 'src/app/services/cargar.service';
import { Global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.component.html',
  styleUrls: ['./info-producto.component.css'],
  providers:[ProductoService,CargarService]
})
export class InfoProductoComponent implements OnInit{
  public url:string;
  public producto:Producto;
  public confirm:boolean;

  constructor(
    private _productoService:ProductoService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.url=Global.url;
    this.producto=new Producto("","","",0,0,"","");
    this.confirm=false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this.getProducto(id);
    })
  }
  getProducto(id:string){
    this._productoService.getProducto(id).subscribe(
      response=>{
        this.producto=response.producto;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  setConfirm(confirm:boolean){
    this.confirm=confirm;
  }
  borrarProducto(id:string){
    this._productoService.deleteProducto(id).subscribe(
      response=>{
          this._router.navigate(['/carnes']);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
