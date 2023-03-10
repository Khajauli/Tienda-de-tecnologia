import {Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Producto } from "../models/producto";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class ProductoService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }


    getProductos():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'productos',{headers:headers});
    }


    guardarProductos(producto:Producto):Observable<any>{
        let params=JSON.stringify(producto);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'guardarProducto',params,{headers:headers});
    }



    getProducto(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'producto/'+id,{headers:headers});
    }


    updateProducto(producto:Producto):Observable<any>{
        let params=JSON.stringify(producto);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'producto/'+producto._id,params,{headers:headers});
    }


    deleteProducto(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'producto/'+id,{headers:headers});
    }

    getProductoN(nombre:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'productoN/'+nombre,{headers:headers});
    }


}