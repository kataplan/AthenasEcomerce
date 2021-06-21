import { NgModule } from '@angular/core';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/body/cart/cart.component';
import { CategoryComponent } from './pages/body/category/category.component';
import { HomeComponent } from './pages/body/home/home.component';
import { LoginComponent } from './pages/body/login/login.component';
import { ProductComponent } from './pages/body/product/product.component';
import { RegisterComponent } from './pages/body/register/register.component';
import { SearchComponent } from './pages/body/search/search.component';
import { CheckoutComponent } from './pages/body/checkout/checkout.component';
import { AdminComponent } from './pages/body/admin/admin.component';
import { ProfileComponent } from './pages/body/profile/profile.component';
import { ResetpasswordComponent } from './pages/body/resetpassword/resetpassword.component'
import { PasswordRecoveryComponent } from './pages/body/password-recovery/password-recovery.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search/:busqueda', component: SearchComponent },
  { path: 'producto/:producto', component: ProductComponent },
  { path: 'categoria/:categoria', component: CategoryComponent},
  { path: 'carrito', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'perfil', component: ProfileComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'passwordReset',component:ResetpasswordComponent},
  { path: 'passwordRecovery/:token',component:PasswordRecoveryComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
