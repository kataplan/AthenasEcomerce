import { NgModule } from '@angular/core';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/body/cart/cart.component';
import { HomeComponent } from './pages/body/home/home.component';
import { LoginComponent } from './pages/body/login/login.component';
import { ProductComponent } from './pages/body/product/product.component';
import { RegisterComponent } from './pages/body/register/register.component';
import { SearchComponent } from './pages/body/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search/:busqueda', component: SearchComponent },
  { path: 'product/:producto', component: ProductComponent },
  { path: 'categoria', component: SearchComponent},
  { path: 'categoria/:categoria', component: SearchComponent},
  { path: 'carrito', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
