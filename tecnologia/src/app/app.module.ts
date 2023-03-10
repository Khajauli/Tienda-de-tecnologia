import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NuevoProductoComponent } from './components/nuevo-producto/nuevo-producto.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { EdicionComponent } from './components/edicion/edicion.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { PieComponent } from './components/pie/pie.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { InfoProductoComponent } from './components/info-producto/info-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NuevoProductoComponent,
    CatalogoComponent,
    EdicionComponent,
    ContactosComponent,
    EncabezadoComponent,
    PieComponent,
    InfoProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
