import { NgModule } from '@angular/core';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'product', component: ProductComponent },
  { path: 'categoria/football', component: SearchComponent},
  { path: 'categoria/basketball', component: SearchComponent},
  { path: 'categoria/rugby', component: SearchComponent},
  { path: 'categoria/handball', component: SearchComponent},
  { path: 'categoria/ciclismo', component: SearchComponent},
  { path: 'categoria/boxeo', component: SearchComponent},
  { path: 'categoria/tenis', component: SearchComponent},
  { path: 'carrito', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
