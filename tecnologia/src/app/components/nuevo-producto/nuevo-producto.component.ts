import { Component,OnInit,ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CargarService } from 'src/app/services/cargar.service';
import { Global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css'],
  providers:[ProductoService,CargarService]
})
export class NuevoProductoComponent implements OnInit{
  public titulo:string;
  public producto:Producto;
  public productoGuardar:Producto;
  public url:string;
  public status:string;
  public idGuardado:string;
  public archivosParaCargar:Array<File>;
  @ViewChild('archivoImagen') fileInput:any;

  constructor(
    private _productoService:ProductoService,
    private _cargarService:CargarService
    
  ){
    this.titulo="Ingrese su producto AQUI";
    this.url=Global.url;
    this.producto=new Producto('','','',0,0,'','');
    this.productoGuardar=new Producto('','','',0,0,'','');
    this.status="";
    this.idGuardado="";
    this.archivosParaCargar=[];
  }

  ngOnInit():void{

  }

  guardarProducto(form:NgForm){
    this._productoService.guardarProductos(this.producto).subscribe(
      response=>{
        if(response.producto){ 
          if(this.archivosParaCargar){
            this._cargarService.peticionRequest(Global.url+"subir-imagen/"+response.producto._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              this.productoGuardar=result.response;
              this.status='success';
              this.idGuardado=result.producto._id;
              form.reset();
              this.fileInput.nativeElement.value='';
            });
          }else{
            this.status='failed';
          }
        }else{
          this.status='falied';
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  imagenChangeEvent(archivoSeleccionado:any){
    this.archivosParaCargar=<Array<File>>archivoSeleccionado.target.files;
  }
}
