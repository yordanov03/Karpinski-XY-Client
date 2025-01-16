import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { PaintingsComponent } from './components/pages/paintings/paintings.component';
import { ControlPanelComponent } from './components/pages/control-panel/control-panel.component';
import { PaintingsDetailsComponent } from './components/pages/paintings-details/paintings-details.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { CreatePaintingComponent } from './components/pages/create-painting/create-painting.component';
import { EditPaintingComponent } from './components/pages/edit-painting/edit-painting.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { CreateExhibitionComponent } from './components/pages/create-exhibition/create-exhibition.component';
import { ExhibtionComponent } from './components/pages/exhibtions/exhibtions.component';
import { ExhibitionDetailsComponent } from './components/pages/exhibition-details/exhibition-details.component';
import { EditExhibitionComponent } from './components/pages/edit-exhibition/edit-exhibition.component';
import { metaConfig } from './shared/meta.config';

const routes: Routes = [
  { path: '', component: HomePageComponent, data: metaConfig.home },
  { path: 'about', component: AboutComponent, data: metaConfig.about },
  { path: 'faq', component: FaqComponent, data: metaConfig.faq },
  { path: 'error', component: ErrorComponent, data: metaConfig.error },
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: RegisterComponent},
  { path: 'terms-conditions', component: TermsConditionsComponent, data: metaConfig.termsConditions },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, data: metaConfig.privacyPolicy },
  { path: 'coming-soon', component: ComingSoonComponent},
  { path: 'create-painting', component: CreatePaintingComponent},
  { path: 'create-exhibition', component: CreateExhibitionComponent},
  { path: 'paintings', component: PaintingsComponent, data: metaConfig.paintings },
  { path: 'portfolio', component: PortfolioComponent, data: metaConfig.portfolio },
  { path: 'control-panel', component: ControlPanelComponent},
  { path: 'paintings-details/:id', component: PaintingsDetailsComponent, data: metaConfig.paintingDetails },
  { path: 'paintings/:id/edit', component: EditPaintingComponent},
  { path: 'contact', component: ContactComponent, data: metaConfig.contact },
  { path: 'exhibitions', component: ExhibtionComponent, data: metaConfig.exhibitions },
  { path: 'exhibitions-details/:id', component: ExhibitionDetailsComponent, data: metaConfig.exhibitionDetails },
  { path: 'exhibitions/:id/edit', component: EditExhibitionComponent},
  { path: '**', component: ErrorComponent, data: metaConfig.error },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
          onSameUrlNavigation: 'reload', // This enables reloading when navigating to the same URL
        }),
      ],
    exports: [RouterModule]
})
export class AppRoutingModule { }