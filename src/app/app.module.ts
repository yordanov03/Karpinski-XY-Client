import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { RecoverPasswordComponent } from './components/pages/recover-password/recover-password.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { PaintingsComponent } from './components/pages/paintings/paintings.component';
import { ServicesDetailsComponent } from './components/pages/services-details/services-details.component';
import { ControlPanelComponent } from './components/pages/control-panel/control-panel.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { PaintingsDetailsComponent } from './components/pages/paintings-details/paintings-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { CreatePaintingComponent } from './components/pages/create-painting/create-painting.component';
import { AuthService } from './_services/auth.service';
import { UploadPaintingComponent } from './components/pages/upload-painting/upload-painting.component';
import { EditPaintingComponent } from './components/pages/edit-painting/edit-painting.component';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { PaintingCardComponent } from './components/common/painting-card/painting-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    FaqComponent,
    ErrorComponent,
    SignInComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    ComingSoonComponent,
    PaintingsComponent,
    ServicesDetailsComponent,
    ControlPanelComponent,
    CartComponent,
    CheckoutComponent,
    PaintingsDetailsComponent,
    BlogComponent,
    BlogDetailsComponent,
    ContactComponent,
    CreatePaintingComponent,
    UploadPaintingComponent,
    EditPaintingComponent,
    PaintingCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthService,
  {provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
