import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
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
import { ContactComponent } from './components/pages/contact/contact.component';
import { CreatePaintingComponent } from './components/pages/create-painting/create-painting.component';
import { EditPaintingComponent } from './components/pages/edit-painting/edit-painting.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { CreateExhibitionComponent } from './components/pages/create-exhibition/create-exhibition.component';
import { ExhibtionComponent } from './components/pages/exhibtion/exhibtion.component';
import { ExhibitionDetailsComponent } from './components/pages/exhibition-details/exhibition-details.component';

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'about', component: AboutComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'sign-up', component: RegisterComponent},
    {path: 'recover-password', component: RecoverPasswordComponent},
    {path: 'terms-conditions', component: TermsConditionsComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'create-painting', component: CreatePaintingComponent},
    {path: 'create-exhibition', component: CreateExhibitionComponent},
    {path: 'paintings', component: PaintingsComponent},
    {path: 'portfolio', component: PortfolioComponent},
    {path: 'service-details', component: ServicesDetailsComponent},
    {path: 'control-panel', component: ControlPanelComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'paintings-details/:id', component: PaintingsDetailsComponent},
    {path: 'paintings/:id/edit', component: EditPaintingComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'exhibitions', component: ExhibtionComponent},
    {path: 'exhibitions-details/:id', component: ExhibitionDetailsComponent},
    // {path: 'exhibitions-details', component: ExhibitionDetailsComponent},
    {path: '**', component: ErrorComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }