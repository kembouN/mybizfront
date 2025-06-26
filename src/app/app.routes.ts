import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './account/component/login/login.component';

export const routes: Routes = [

  {
    path: "login",
    loadComponent: () => import('./account/component/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: "choose-enterprise",
    loadComponent: () => import('./account/component/choose-enterprise/choose-enterprise.component').then(c => c.ChooseEnterpriseComponent)
  },
  {
    path: "register",
    loadComponent: () => import('./account/component/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path:"client",
    loadComponent: () => import('./client/component/client/client.component').then(c => c.ClientComponent),
    canActivate: [authGuard]
  },
  {
    path:"enterprises",
    loadComponent: () => import('./enterprise/component/entreprise/entreprise.component').then(c => c.EntrepriseComponent),
    canActivate: [authGuard]
  },
  {
    path:"services",
    loadComponent: () => import('./services/component/services/services.component').then(c => c.ServicesComponent),
    canActivate: [authGuard]
  },
  {
    path:"commandes",
    loadComponent: () => import('./commandes/component/commandes/commandes.component').then(c => c.CommandesComponent),
    canActivate: [authGuard]
  },
  {
    path:"dashboard",
    loadComponent: () => import('./dashboard/component/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path:"sous-services",
    loadComponent: () => import('./sous-service/components/sous-service/sous-service.component').then(c => c.SousServiceComponent),
    canActivate: [authGuard]
  },
  {
    path: "collaborateurs",
    loadComponent: () => import('./collaborateur/component/collaborateur/collaborateur.component').then(c => c.CollaborateurComponent),
    canActivate: [authGuard]
  },
  {
    path: "profil",
    loadComponent: () => import('./account/component/profil/profil.component').then(c => c.ProfilComponent),
    canActivate: [authGuard]
  },
  {
    path: "",
    component: LoginComponent
  }

];
