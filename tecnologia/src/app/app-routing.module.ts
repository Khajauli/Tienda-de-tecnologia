import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { EdicionComponent } from './components/edicion/edicion.component';
import { HomeComponent } from './components/home/home.component';
import { NuevoProductoComponent } from './components/nuevo-producto/nuevo-producto.component';


const routes: Routes = [
    {path:'inicio',component:HomeComponent},
    {path:'edicion/:id',component:EdicionComponent},
    {path:'contactos',component:ContactosComponent},
    {path:'catalogo',component:CatalogoComponent},
    {path:'nuevoProducto',component:NuevoProductoComponent},
    {path:'**',component:HomeComponent}

  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  