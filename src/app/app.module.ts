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
import { MatSelectModule } from '@angular/material/select';
import { ComentComponent } from './pages/body/product/coment/coment.component';
import { ProductoService } from './services/producto.service'
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './pages/body/cart/cart.component';
import { MatTableModule } from '@angular/material/table';
import { StarComponent } from './util/star/star.component';
import { FilterComponent } from './util/filter/filter.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import { CategoryComponent } from './pages/body/category/category.component';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxCaptchaModule } from 'ngx-captcha';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CheckoutComponent} from './pages/body/checkout/checkout.component';
import { AdminComponent } from './pages/body/admin/admin.component';
import { ProfileComponent } from './pages/body/profile/profile.component';
import { ResetpasswordComponent } from './pages/body/resetpassword/resetpassword.component';
import { PasswordRecoveryComponent } from './pages/body/password-recovery/password-recovery.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { DialogComponent } from './util/dialog/dialog.component';


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
    StarComponent,
    FilterComponent,
    CategoryComponent,
    CheckoutComponent,
    AdminComponent,
    ProfileComponent,
    ResetpasswordComponent,
    PasswordRecoveryComponent,
    DialogComponent,
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
    MatExpansionModule,
    MatSliderModule,
    MatBadgeModule,
    NgxCaptchaModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTabsModule,
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
