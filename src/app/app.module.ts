import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './pages/header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './pages/body/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './pages/body/home/home.component';
import { RegisterComponent } from './pages/body/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FooterComponent } from './pages/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './pages/body/search/search.component';
import { ProductComponent } from './pages/body/product/product.component';
import {MatSelectModule} from '@angular/material/select';
import { ComentComponent } from './pages/body/product/coment/coment.component';
import {ProductoService} from './services/producto.service'
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './pages/body/cart/cart.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    FooterComponent,
    SearchComponent,
    ProductComponent,
    ComentComponent,
    CartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    NgbModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
