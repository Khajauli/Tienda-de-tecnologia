import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { CargarService } from 'src/app/services/cargar.service';
import { Global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-edicion',
  templateUrl: '../nuevo-producto/nuevo-producto.component.html',
  styleUrls: ['./edicion.component.css'],
  providers:[ProductoService,CargarService]
})
export class EdicionComponent implements OnInit{
  public titulo:string;
  public producto:Producto;
  public productoGuardar:Producto;
  public url:string;
  public archivosParaCargar:Array<File>;
  public status:string;
  public idGuardado:string;

  constructor(
    private _productoService:ProductoService,
    private _cargarService:CargarService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.titulo="CAMBIAR PRODUCTOS";
    this.url=Global.url;
    this.producto=new Producto("","","",0,0,"","");
    this.productoGuardar=new Producto("","","",0,0,"","");
    this.archivosParaCargar=[];
    this.status='';
    this.idGuardado='';
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      //console.log(id);
      this.getProducto(id);
    })
  }
  getProducto(id:string){
    this._productoService.getProducto(id).subscribe(
      response=>{
        this.producto=response.producto;
        console.log(this.producto)
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  guardarProducto(form:NgForm){
    this._productoService.updateProducto(this.producto).subscribe(
      response=>{
        if(this.archivosParaCargar){
          this._cargarService.peticionRequest(Global.url+"subir-imagen/"+this.producto._id,[],this.archivosParaCargar,'imagen')
          .then((result:any)=>{
            this.productoGuardar=result.response;
            this.status='success';
            this.idGuardado=result.producto._id;
            form.reset();
          });
        }else{
          this.productoGuardar=response.producto;
            this.status='success';
            form.reset();
        }
      }
    );
  }
  imagenChangeEvent(archivoSeleccionado:any){
    this.archivosParaCargar=<Array<File>>archivoSeleccionado.target.files;
  }
}
